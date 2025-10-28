import React, { useState, useEffect, useRef } from "react";
import { databases, ID } from "../../appwrite/appwrite.js"; 
import { CheckIcon, SuccessIcon, Spinner } from './Icons.jsx'

// --- Reusable Form Field Components with Floating Labels ---
const FloatingLabelInput = ({ id, name, type, value, onChange, error, label }) => (
  <div className="relative">
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      placeholder=" "
      className={`
        peer block w-full bg-transparent border-0 border-b-2 
        ${error ? 'border-red-500' : 'border-gray-600'} 
        focus:border-emerald-400 focus:outline-none focus:ring-0
        text-white py-3 transition-all duration-300
        placeholder-transparent
      `}
    />
    <label
      htmlFor={id}
      className={`
        absolute left-0 top-3 text-gray-400 cursor-text
        transition-all duration-300 transform origin-left
        peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
        peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-emerald-400
        ${error ? 'text-red-400 peer-focus:text-red-400' : ''}
        ${value ? '-translate-y-6 scale-75 text-emerald-400' : ''}
      `}
    >
      {label}
    </label>
    {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
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
        ${error ? 'border-red-500' : 'border-gray-600'} 
        focus:border-emerald-400 focus:outline-none focus:ring-0
        text-white py-3 transition-all duration-300
        ${!value ? 'text-gray-400' : 'text-white'}
      `}
    >
      {children}
    </select>
    <label
      htmlFor={id}
      className={`
        absolute left-0 top-3 text-gray-400
        transition-all duration-300 transform origin-left
        peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-emerald-400
        ${error ? 'text-red-400 peer-focus:text-red-400' : ''}
        ${value ? '-translate-y-6 scale-75 text-emerald-400' : ''}
      `}
    >
      {label}
    </label>
    <div className="absolute right-2 top-3 pointer-events-none">
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>
    {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
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
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.graduationYear) newErrors.graduationYear = "Graduation year is required";
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

      if (!COLLECTION_ID) {
        throw new Error("Collection ID is missing. Please check your .env file and restart the server.");
      }

      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: `${formData.phone}`,
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
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4 font-sans overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>
      
      <div 
        ref={cardRef}
        className="relative w-full max-w-6xl rounded-3xl bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 shadow-2xl animate-fade-in-up overflow-hidden"
        style={{
          '--mouse-x': '50%',
          '--mouse-y': '50%',
        }}
      >
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        <div className="grid lg:grid-cols-2 relative z-10">
          {/* Left Side: Information */}
          <div className="p-8 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-700/50 bg-gradient-to-br from-gray-900/80 to-gray-800/40">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/60 border border-gray-700/50 mb-6">
                <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm text-gray-300 font-medium">JOIN OPENSTART COHORT</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black mb-6">
                <span className="bg-gradient-to-r from-white via-emerald-100 to-blue-200 bg-clip-text text-transparent">
                  Start Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Journey
                </span>
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-8 font-light">
                Be among the first to know when applications open for the OpenStart Accelerator program. 
                Get early access and exclusive updates.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/30 border border-gray-700/30 hover:border-emerald-500/30 transition-all duration-300 group">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CheckIcon />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Early Application Access</h3>
                  <p className="text-gray-400 text-sm">Get notified before public launch</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/30 border border-gray-700/30 hover:border-blue-500/30 transition-all duration-300 group">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CheckIcon />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Exclusive Resources</h3>
                  <p className="text-gray-400 text-sm">Access to founder toolkit and guides</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/30 border border-gray-700/30 hover:border-cyan-500/30 transition-all duration-300 group">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CheckIcon />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Network Building</h3>
                  <p className="text-gray-400 text-sm">Connect with fellow aspiring founders</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="p-8 lg:p-12 bg-gray-900/40">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mb-6">
                  <SuccessIcon />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">You're on the list!</h3>
                <p className="text-gray-300 leading-relaxed">
                  Thank you for your interest in OpenStart. We'll be in touch with program updates and early application access.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <FloatingLabelInput 
                    id="firstName" 
                    name="firstName" 
                    type="text" 
                    value={formData.firstName} 
                    onChange={handleChange} 
                    error={errors.firstName} 
                    label="First Name *" 
                  />
                  <FloatingLabelInput 
                    id="lastName" 
                    name="lastName" 
                    type="text" 
                    value={formData.lastName} 
                    onChange={handleChange} 
                    error={errors.lastName} 
                    label="Last Name *" 
                  />
                </div>
                
                <FloatingLabelInput 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  error={errors.email} 
                  label="Email Address *" 
                />
                
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <FloatingLabelInput 
                    id="country" 
                    name="country" 
                    type="text" 
                    value={formData.country} 
                    onChange={handleChange} 
                    error={errors.country} 
                    label="Country *" 
                  />
                  <FloatingLabelInput 
                    id="phone" 
                    name="phone" 
                    type="tel" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    error={errors.phone} 
                    label="Phone Number" 
                  />
                </div>

                <FloatingLabelSelect 
                  id="graduationYear" 
                  name="graduationYear" 
                  value={formData.graduationYear} 
                  onChange={handleChange} 
                  error={errors.graduationYear} 
                  label=" *"
                >
                  <option value="" className="bg-gray-800">Select graduation year</option>
                  {years.map((year) => (
                    <option key={year} value={year} className="bg-gray-800">
                      {year}
                    </option>
                  ))}
                </FloatingLabelSelect>

                {errors.submit && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <p className="text-sm text-red-400 text-center">{errors.submit}</p>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full group relative bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    {isLoading && <Spinner />}
                    <span className="tracking-wide">
                      {isLoading ? "Submitting..." : "Join Waitlist"}
                    </span>
                  </div>
                </button>
                
                <p className="text-center text-gray-400 text-sm">
                  By joining, you agree to receive updates about OpenStart Accelerator program.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(10px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.1; }
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 15s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}