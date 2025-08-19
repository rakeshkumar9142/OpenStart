import React from 'react';

// Assuming 'Link' comes from a routing library like 'react-router-dom' or 'next/link'
// If you are not using a router, you might want to replace <Link> with <a>
import { Link } from 'react-router-dom'; // Example import, adjust if needed

export default function Rakesh() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Rakesh Kumar</h2>
        <p className="text-gray-600 mb-6">
          Hi, I’m Rakesh 👋. This is a sample page built with <span className="font-semibold">React</span> 
          and styled using <span className="text-blue-500 font-semibold">Tailwind CSS</span>.  
          I love building projects in web development, IoT, and exploring new technologies. 🚀
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            to="/" 
            className="px-4 py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
          >
            Go Home
          </Link>
          <Link 
            to="/about" 
            className="px-4 py-2 rounded-xl bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
          >
            About Me
          </Link>
        </div>
      </div>
    </div>
    );
}
