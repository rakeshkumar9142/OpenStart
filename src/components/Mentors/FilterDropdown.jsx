import React,{useState} from "react";
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export const FilterDropdown = ({ label, options, selectedValue, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 transition-all">
                <span>{selectedValue === 'All' ? label : selectedValue}</span>
                <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} size={20} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-600 rounded-lg z-30 max-h-60 overflow-y-auto"
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    >
                        {options.map(option => (
                            <li key={option} onClick={() => { onSelect(option); setIsOpen(false); }} className="px-4 py-2 hover:bg-purple-600/50 cursor-pointer">{option}</li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

