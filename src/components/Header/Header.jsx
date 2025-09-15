import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ASSETS & DATA
import PiCon from "../../assets/Gemini1logo.png";
import navLinks from './navLinks'; // Ensure this path is correct
import { MenuIcon, CloseIcon, ChevronDownIcon, WhatsAppIcon, TelegramIcon } from './Icons.jsx'; // Ensure this path is correct

const OpenStartLogo = PiCon;

export default function Header() {
    // State for the mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // State for the currently open dropdown on desktop
    const [openDesktopSubmenu, setOpenDesktopSubmenu] = useState(null);

    const desktopNavRef = useRef(null);
    const mobileNavRef = useRef(null);

    // Custom hook logic to detect clicks outside an element
    const useOnClickOutside = (ref, handler) => {
        useEffect(() => {
            const listener = (event) => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        }, [ref, handler]);
    };

    // Close menus on outside click
    useOnClickOutside(desktopNavRef, () => setOpenDesktopSubmenu(null));
    useOnClickOutside(mobileNavRef, () => setIsMenuOpen(false));

    // Close menus on 'Escape' key press
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setIsMenuOpen(false);
                setOpenDesktopSubmenu(null);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    // Prevent body scrolling when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    }, [isMenuOpen]);
    
    // Styling for active NavLink
    const navLinkClass = ({ isActive }) =>
        `relative font-medium text-gray-300 transition-colors duration-300 hover:text-white after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-full after:scale-x-0 after:bg-indigo-400 after:transition-transform after:duration-300 after:origin-left ${
            isActive ? "text-white after:scale-x-100" : ""
        }`;

    return (
        <header className="sticky top-0 z-50 w-full bg-gray-900/80 backdrop-blur-sm border-b border-white/10">
            <nav className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <img src={OpenStartLogo} className="h-14 w-14 rounded-full object-cover transition-transform duration-300 hover:scale-110 hover:rotate-6" alt="OpenStart Logo" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div ref={desktopNavRef} className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex lg:items-center lg:gap-x-10">
                        {navLinks.map((link, index) => (
                            <div key={index} className="relative">
                                {link.submenu ? (
                                    <>
                                        <button
                                            onClick={() => setOpenDesktopSubmenu(openDesktopSubmenu === index ? null : index)}
                                            className="flex items-center gap-1 font-medium text-gray-300 transition-colors duration-300 hover:text-white"
                                            aria-haspopup="true"
                                            aria-expanded={openDesktopSubmenu === index}
                                        >
                                            {link.text}
                                            <ChevronDownIcon className={`h-4 w-4 transition-transform duration-300 ${openDesktopSubmenu === index ? 'rotate-180' : ''}`} />
                                        </button>
                                        <AnimatePresence>
                                            {openDesktopSubmenu === index && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                                    className="absolute top-full left-1/2 mt-4 w-48 -translate-x-1/2 rounded-lg bg-gray-800/90 backdrop-blur-sm border border-white/10 shadow-xl p-2"
                                                >
                                                    {link.submenu.map((subItem) => (
                                                        <NavLink key={subItem.to} to={subItem.to} onClick={() => setOpenDesktopSubmenu(null)} className={({ isActive }) => `block w-full text-left rounded-md px-4 py-2 text-sm ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-200 hover:bg-indigo-600/50'}`}>
                                                            {subItem.text}
                                                        </NavLink>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <NavLink to={link.to} className={navLinkClass}>
                                        {link.text}
                                    </NavLink>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="hidden lg:flex lg:items-center lg:gap-x-4">
                        <Link to="/login" className="rounded-md px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white">Log in</Link>
                        <Link to="https://t.me/OpenStartProject_bot" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-md bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30">
                            <TelegramIcon className="h-5 w-5 mr-2" /> Join Us
                        </Link>
                        {/* You can add your WhatsApp button here if needed */}
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button onClick={() => setIsMenuOpen(true)} className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-white/10 hover:text-white">
                            <span className="sr-only">Open main menu</span>
                            <MenuIcon />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && <MobileMenu navLinks={navLinks} navRef={mobileNavRef} onClose={() => setIsMenuOpen(false)} />}
            </AnimatePresence>
        </header>
    );
}

// Sub-component for the Mobile Menu, kept in the same file
const MobileMenu = ({ navLinks, navRef, onClose }) => {
    const [openSubmenu, setOpenSubmenu] = useState(null);

    // Variants for container animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        },
        exit: { opacity: 0 }
    };
    
    // Variants for list item animation
    const itemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-gray-900/70 backdrop-blur-sm lg:hidden"
        >
            <motion.div
                ref={navRef}
                variants={{
                    hidden: { y: "-100%", opacity: 0 },
                    visible: { y: "0%", opacity: 1 },
                    exit: { y: "-100%", opacity: 0 }
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full bg-gray-900 border-b border-white/10 shadow-lg p-4"
            >
                <div className="flex justify-between items-center mb-6">
                    <Link to="/" onClick={onClose}><img src={OpenStartLogo} className="h-12 w-12 rounded-full" alt="OpenStart Logo" /></Link>
                    <button onClick={onClose} className="p-2 text-gray-300 hover:text-white"><CloseIcon /></button>
                </div>
                
                <motion.div variants={containerVariants} className="space-y-2">
                    {navLinks.map((link, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            {link.submenu ? (
                                <div>
                                    <button onClick={() => setOpenSubmenu(openSubmenu === index ? null : index)} className="w-full flex justify-between items-center rounded-md px-3 py-2 text-lg font-medium text-gray-300 hover:bg-white/10 hover:text-white">
                                        <span>{link.text}</span>
                                        <ChevronDownIcon className={`h-5 w-5 transition-transform ${openSubmenu === index ? 'rotate-180' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {openSubmenu === index && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-4 mt-1 space-y-1">
                                                {link.submenu.map((subItem) => (
                                                    <NavLink key={subItem.to} to={subItem.to} onClick={onClose} className={({ isActive }) => `block rounded-md px-3 py-2 text-base font-medium ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-white/10'}`}>
                                                        {subItem.text}
                                                    </NavLink>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <NavLink to={link.to} onClick={onClose} className={({ isActive }) => `block rounded-md px-3 py-2 text-lg font-medium ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-white/10'}`}>
                                    {link.text}
                                </NavLink>
                            )}
                        </motion.div>
                    ))}
                    {/* Mobile Action Buttons */}
                    <motion.div variants={itemVariants} className="border-t border-white/10 pt-4 mt-4 flex flex-col items-start space-y-3">
                         <Link to="/login" onClick={onClose} className="w-full text-center rounded-md px-3 py-3 text-lg font-medium text-gray-300 hover:bg-white/10 hover:text-white">Log in</Link>
                         <Link to="https://t.me/OpenStartProject_bot" target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center rounded-md bg-gradient-to-r from-sky-500 to-blue-600 px-3 py-3 text-lg font-medium text-white shadow-lg">
                             <TelegramIcon className="h-5 w-5 mr-2" /> Join on Telegram
                         </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}