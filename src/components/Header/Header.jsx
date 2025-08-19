import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

// Using a placeholder for the logo so the component is self-contained and runnable.
const OpenStartLogo = 'https://placehold.co/100x100/1e1b4b/ffffff?text=OS&font=inter';

// SVG Icons for the mobile menu toggle for a clean, dependency-free implementation.
const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// Inlined WhatsApp SVG Icon
const WhatsAppIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.398 1.919 6.166l-.362 1.254 1.27 1.241z" />
    </svg>
);

// --- ADDED: Inlined Telegram SVG Icon ---
const TelegramIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M24 12c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm-18.435-1.429l3.541 1.348 4.09 3.868-4.635 4.331c-.38-.21-.733-.463-1.056-.759l-1.94-8.788zm15.435-2.571l-12.053 4.852 10.941 10.179c.923-.463 1.748-1.13 2.435-1.948l-1.323-13.083zm-3.48 2.029l-4.52 4.234-3.541-1.347 8.061-5.621z"/>
    </svg>
);


export default function Header() {
    // State to manage the visibility of the mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Navigation links data for easier mapping and maintenance
    const navLinks = [
        { to: "/", text: "Home" },
        { to: "/about", text: "About" },
        { to: "/contact", text: "Contact" },
        { to: "/github", text: "Github" },
        { to: "/rakesh", text: "rakesh" },
    ];

    // Style for NavLink, making it reusable
    const navLinkClass = ({ isActive }) =>
        `relative font-medium text-white transition-colors duration-300 hover:text-indigo-400 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:scale-x-0 after:bg-indigo-400 after:transition-transform after:duration-300 after:origin-left ${
            isActive ? "text-indigo-400 after:scale-x-100" : ""
        }`;

    return (
        <header className="sticky top-0 z-50 w-full bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
            <nav className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <img
                            src={OpenStartLogo}
                            className="h-14 w-14 rounded-full object-cover transition-transform duration-300 hover:scale-110"
                            alt="OpenStart Logo"
                        />
                    </Link>

                    {/* Desktop Navigation Links - Centered */}
                    <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex lg:items-center lg:gap-x-10">
                        {navLinks.map((link) => (
                             <NavLink key={link.to} to={link.to} className={navLinkClass}>
                                {link.text}
                            </NavLink>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="hidden lg:flex lg:items-center lg:gap-x-4">
                        <Link
                            to="#"
                            className="rounded-md px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
                        >
                            Log in
                        </Link>
                        {/* --- ADDED TELEGRAM BUTTON --- */}
                        <Link
                            to="https://t.me/@RakeshKumar9905" // Replace with your Telegram link
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-md bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105"
                        >
                            <TelegramIcon className="h-5 w-5 mr-2" />
                            Join Us
                        </Link>
                        <Link
                            to="https://wa.me/919905307658"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-md bg-gradient-to-r from-green-500 to-teal-500 px-4 py-2 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105"
                        >
                            <WhatsAppIcon className="h-5 w-5 mr-2" />
                            Chat Now
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                        {navLinks.map((link) => (
                             <NavLink 
                                key={link.to} 
                                to={link.to} 
                                className={({isActive}) => `block rounded-md px-3 py-2 text-base font-medium ${isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                                onClick={() => setIsMenuOpen(false)} // Close menu on click
                            >
                                {link.text}
                            </NavLink>
                        ))}
                        <div className="border-t border-gray-700 pt-4 mt-4 flex flex-col items-start space-y-3">
                             <Link
                                to="#"
                                className="w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                            >
                                Log in
                            </Link>
                             {/* --- ADDED TELEGRAM BUTTON TO MOBILE MENU --- */}
                            <Link
                                to="https://t.me/@RakeshKumar9905" // Replace with your Telegram link
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center rounded-md bg-gradient-to-r from-sky-500 to-blue-600 px-3 py-2 text-base font-medium text-white shadow-lg"
                            >
                                 <TelegramIcon className="h-5 w-5 mr-2" />
                                Join on Telegram
                            </Link>
                            <Link
                                to="https://wa.me/919905307658"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center rounded-md bg-gradient-to-r from-green-500 to-teal-500 px-3 py-2 text-base font-medium text-white shadow-lg"
                            >
                                 <WhatsAppIcon className="h-5 w-5 mr-2" />
                                Chat on WhatsApp
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
