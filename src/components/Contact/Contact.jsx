import React, { useState, useEffect, useRef } from "react";
// Make sure this path points to your appwrite configuration file
// It should export a 'databases' object and 'ID'.
import { databases, ID } from "../../appwrite/appwrite.js"; 

// --- SVG Icon Components (for clarity) ---
const CheckIcon = () => (
  <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);
const SuccessIcon = () => (
  <svg className="w-16 h-16 text-green-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// --- Reusable Form Field Components with Floating Labels ---
const FloatingLabelInput = ({ id, name, type, value, onChange, error, label }) => (
  <div className="relative">
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      placeholder=" " // The space is crucial for the floating label to work
      className={`
        peer block w-full bg-transparent border-0 border-b-2 
        ${error ? 'border-red-500/50' : 'border-gray-600'} 
        focus:border-indigo-400 focus:outline-none focus:ring-0
        text-white py-2 transition-colors duration-300
      `}
    />
    <label
      htmlFor={id}
      className={`
        absolute left-0 -top-3.5 text-sm text-gray-400
        transition-all duration-300 
        peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
        peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-indigo-400
        ${error ? 'text-red-400 peer-focus:text-red-400' : ''}
      `}
    >
      {label}
    </label>
    {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
  </div>
);

const FloatingLabelSelect = ({ id, name, value, onChange, error, label, children }) => (
    <div className="relative">
      <select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className={`
          peer block w-full bg-transparent border-0 border-b-2 appearance-none
          ${error ? 'border-red-500/50' : 'border-gray-600'} 
          focus:border-indigo-400 focus:outline-none focus:ring-0
          text-white py-2 transition-colors duration-300
          ${value ? 'text-white' : 'text-gray-400'}
        `}
      >
        {children}
      </select>
      <label
        htmlFor={id}
        className={`
          absolute left-0 -top-3.5 text-sm 
          transition-all duration-300 
          ${error ? 'text-red-400' : 'text-gray-400'}
          ${value ? 'text-indigo-400' : ''}
        `}
      >
        {label}
      </label>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );

// --- Main Contact Form Component ---
export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", country: "", graduationYear: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const cardRef = useRef(null);

  // Mouse-follow glow effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    card.addEventListener('mousemove', handleMouseMove);
    return () => card.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.email.trim()) newErrors.email = "A valid email is required.";
    if (!formData.country.trim()) newErrors.country = "Country is required.";
    if (!formData.graduationYear) newErrors.graduationYear = "Please select a year.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    setErrors({});
    setIsSuccess(false);

    try {
      const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
      const COLLECTION_ID = import.meta.env.VITE_APPWRITE_TABLE_ID_CONTACTS;

      // This log helps confirm if the variable is loaded. If it shows 'undefined', the .env file is the issue.
      console.log("Using Collection ID:", COLLECTION_ID);

      if (!COLLECTION_ID) {
        throw new Error("Collection ID is missing. Please check your .env file and restart the server.");
      }

      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: `+91${formData.phone}`,
        country: formData.country,
        graduation_year: parseInt(formData.graduationYear, 10),
      });
      setIsSuccess(true);
      setFormData({ firstName: "", lastName: "", email: "", phone: "", country: "", graduationYear: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Appwrite submission error:", error);
      setErrors({ submit: error.message || "Submission failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] p-4 font-sans overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      
      <div 
        ref={cardRef}
        className="card-glow relative w-full max-w-5xl rounded-2xl bg-black/20 backdrop-blur-lg border border-white/10 shadow-2xl shadow-indigo-500/10 animate-fade-in-up"
      >
        <div className="grid md:grid-cols-2">
          {/* Left Side: Information */}
          <div className="p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-indigo-300 to-purple-400 mb-6">
              Shape the Future
            </h1>
            <p className="text-gray-300 leading-relaxed mb-8">
              You're one step away from joining a global movement. Get exclusive updates on the OpenStart accelerator program.
            </p>
            <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-3"><CheckIcon /> Early Access to Applications</li>
                <li className="flex items-center gap-3"><CheckIcon /> Connections with Global Mentors</li>
                <li className="flex items-center gap-3"><CheckIcon /> Invites to Exclusive Webinars</li>
            </ul>
          </div>

          {/* Right Side: Form */}
          <div className="p-8 md:p-12">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <SuccessIcon />
                <h3 className="text-2xl font-bold text-white">You're on the list!</h3>
                <p className="text-green-300 mt-2">Thanks for your interest. We'll be in touch with updates soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <FloatingLabelInput id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} error={errors.firstName} label="First Name*" />
                  <FloatingLabelInput id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} error={errors.lastName} label="Last Name*" />
                </div>
                
                <FloatingLabelInput id="email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} label="Email*" />
                <FloatingLabelInput id="country" name="country" type="text" value={formData.country} onChange={handleChange} error={errors.country} label="Country*" />

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <FloatingLabelInput id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} error={errors.phone} label="Phone (Optional)" />
                    <FloatingLabelSelect id="graduationYear" name="graduationYear" value={formData.graduationYear} onChange={handleChange} error={errors.graduationYear} label="Graduation Year*">
                        <option value="">Please select</option>
                        {years.map((year) => <option key={year} value={year} className="bg-gray-800">{year}</option>)}
                    </FloatingLabelSelect>
                </div>

                {errors.submit && <p className="text-sm text-red-400 text-center">{errors.submit}</p>}

                <div>
                  <button type="submit" disabled={isLoading} className="w-full group relative flex justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-indigo-500/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300">
                    {isLoading && <Spinner />}
                    {isLoading ? "Submitting..." : "Join Waitlist"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
