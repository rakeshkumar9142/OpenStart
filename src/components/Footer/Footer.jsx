import React from 'react';
import { Link } from 'react-router-dom';

// Using a placeholder for the logo to keep the component self-contained.
const OpenStartLogo = 'https://placehold.co/100x100/1e1b4b/ffffff?text=OS&font=inter';

// Reusable SVG Icon components for social media links. This keeps the main component cleaner.
const SocialIcon = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors duration-300 hover:text-indigo-400">
        <span className="sr-only">{children[1]}</span>
        {children[0]}
    </a>
);

const GithubIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>;
const TwitterIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>;
const LinkedinIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>;


export default function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-gray-800">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Top section: Logo and Newsletter */}
                <div className="py-12 grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-gray-800">
                    <div className="md:col-span-4 lg:col-span-5 flex flex-col items-start">
                        <Link to="/" className="flex items-center space-x-3 mb-4">
                            <img
                                src={OpenStartLogo}
                                className="h-14 w-14 rounded-full object-cover"
                                alt="OpenStart Logo"
                            />
                            <span className="text-2xl font-bold text-white">OpenStart</span>
                        </Link>
                        <p className="text-gray-400">
                            Empowering the next generation of global entrepreneurs and innovators.
                        </p>
                    </div>
                    <div className="md:col-span-8 lg:col-span-7">
                        <h2 className="text-lg font-semibold text-white mb-3">Stay updated with our journey</h2>
                        <form className="flex flex-col sm:flex-row gap-3">
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="w-full min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                placeholder="Enter your email"
                            />
                            <button
                                type="submit"
                                className="rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Middle section: Link columns */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
                    <div>
                        <h2 className="mb-4 text-sm font-semibold text-gray-300 uppercase tracking-wider">Platform</h2>
                        <ul className="text-gray-400 space-y-3">
                            <li><Link to="/about" className="hover:text-white transition-colors">Features</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Mentors</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Get Started</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-4 text-sm font-semibold text-gray-300 uppercase tracking-wider">Company</h2>
                        <ul className="text-gray-400 space-y-3">
                            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-4 text-sm font-semibold text-gray-300 uppercase tracking-wider">Resources</h2>
                        <ul className="text-gray-400 space-y-3">
                            <li><Link to="#" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Community</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Support</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-4 text-sm font-semibold text-gray-300 uppercase tracking-wider">Legal</h2>
                        <ul className="text-gray-400 space-y-3">
                            <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom section: Copyright and Social Icons */}
                <div className="py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-gray-800">
                    <span className="text-sm text-gray-500 sm:text-center">
                        © {new Date().getFullYear()} OpenStart. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
                        <SocialIcon href="#">
                            <TwitterIcon />
                            <span>Twitter</span>
                        </SocialIcon>
                        <SocialIcon href="#">
                            <GithubIcon />
                            <span>GitHub</span>
                        </SocialIcon>
                        <SocialIcon href="https://www.linkedin.com/in/rakesh-kumar-ba423826b/">
                            <LinkedinIcon />
                            <span>LinkedIn</span>
                        </SocialIcon>
                    </div>
                </div>
            </div>
        </footer>
    );
}
