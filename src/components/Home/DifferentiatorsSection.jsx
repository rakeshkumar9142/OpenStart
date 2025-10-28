import React from "react";
import { differentiators } from "./differentiators.jsx";
import { motion } from "framer-motion";

export default function DifferentiatorsSection() {
  return (
    <section className="relative -mt-8 py-20 px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background depth layers */}
      <div className="absolute -top-32 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-purple-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-blue-500"></div>
            <span className="text-sm font-semibold text-blue-400 tracking-[0.25em] uppercase">
              Why Choose Us
            </span>
            <div className="w-8 h-px bg-blue-500"></div>
          </div>

          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-5">
            What Makes{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              OpenStart
            </span>{" "}
            Different?
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Empowering innovators with the tools, mentorship, and ecosystem to thrive.
          </p>
        </motion.div>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
          {differentiators.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group bg-slate-900/60 border border-slate-700/60 rounded-2xl p-8 
                         backdrop-blur-md hover:border-blue-500/30 hover:shadow-[0_0_35px_-10px_#6366f1] 
                         transition-all duration-500"
            >
              {/* Glow background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 
                              opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

              {/* Icon bubble */}
              <div className="relative z-10 w-16 h-16 mx-auto mb-6 flex items-center justify-center 
                              rounded-full bg-gradient-to-tr from-blue-500/30 to-purple-500/30
                              group-hover:scale-110 transition-transform duration-500">
                <div className="text-3xl text-blue-400">{item.icon}</div>
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Accent dots (matches TeamSection style) */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150"></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
