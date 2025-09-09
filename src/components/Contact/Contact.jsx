import React, { useState } from "react";
import { databases, ID } from "../../appwrite/appwrite.js";

// Spinner for loading state
const Spinner = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
         5.291A7.962 7.962 0 014 12H0c0 3.042 
         1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    graduationYear: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "Please complete this field.";
    if (!formData.lastName) newErrors.lastName = "Please complete this field.";
    if (!formData.email) newErrors.email = "Please complete this field.";
    if (!formData.country) newErrors.country = "Please complete this field.";
    if (!formData.graduationYear)
      newErrors.graduationYear = "Please select an option.";
    return newErrors;
  };

  // Submit
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
      const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID_CONTACTS; // renamed for v1.4+

      await databases.createDocument(DATABASE_ID, TABLE_ID, ID.unique(), {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: `+91${formData.phone}`,
        country: formData.country,
        graduation_year: parseInt(formData.graduationYear, 10),
      });

      setIsSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        graduationYear: "",
      });
    } catch (error) {
      console.error("Appwrite submission error:", error);
      setErrors({ submit: "Failed to submit form. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  // Dropdown years
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg md:p-12">
        <h1 className="text-3xl font-bold text-gray-800">Get updates.</h1>
        <p className="mt-2 text-gray-600">
          Complete the form to get more information about our programs.
        </p>

        {isSuccess ? (
          <div className="mt-8 rounded-md bg-green-100 p-4 text-center">
            <h3 className="text-lg font-medium text-green-800">Thank You!</h3>
            <p className="text-green-700">
              Your information has been submitted successfully.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* First + Last Name */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name*
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`mt-1 input-field ${
                    errors.firstName ? "input-error" : ""
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name*
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`mt-1 input-field ${
                    errors.lastName ? "input-error" : ""
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email*
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 input-field ${
                  errors.email ? "input-error" : ""
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile number*
              </label>
              <div className="mt-1 flex">
                <select className="rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                  <option>India (भारत)</option>
                </select>
                <div className="relative flex-grow">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field rounded-l-none pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Country */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country/Region*
              </label>
              <input
                type="text"
                name="country"
                id="country"
                value={formData.country}
                onChange={handleChange}
                className={`mt-1 input-field ${
                  errors.country ? "input-error" : ""
                }`}
              />
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country}</p>
              )}
            </div>

            {/* Graduation Year */}
            <div>
              <label
                htmlFor="graduationYear"
                className="block text-sm font-medium text-gray-700"
              >
                Admissions – High School Graduation Year*
              </label>
              <select
                name="graduationYear"
                id="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                className={`mt-1 input-field ${
                  errors.graduationYear ? "input-error" : ""
                }`}
              >
                <option value="">Please Select</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              {errors.graduationYear && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.graduationYear}
                </p>
              )}
            </div>

            {errors.submit && (
              <p className="text-sm text-red-600">{errors.submit}</p>
            )}

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
              >
                {isLoading ? <Spinner /> : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
