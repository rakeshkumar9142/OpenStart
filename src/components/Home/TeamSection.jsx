import React from "react";
import { teamMembers } from "./teamMembers.jsx";
import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";

export default function TeamSection() {
  return (
    <section className="relative -mt-8 py-16 px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">

      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#3b82f620,_transparent_60%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-10 h-px bg-blue-500"></div>
            <span className="text-sm font-semibold text-blue-400 tracking-[0.2em] uppercase">
              Our Team
            </span>
            <div className="w-10 h-px bg-blue-500"></div>
          </div>

          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Global Innovators
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Visionaries from around the world, uniting technology and purpose to
            redefine innovation.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group bg-slate-900/60 border border-slate-700/60 rounded-2xl p-8 backdrop-blur-md hover:shadow-[0_0_30px_-10px_#6366f1] hover:border-blue-500/30 transition-all duration-500"
            >
              {/* Glowing Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-2xl"></div>

              <div className="relative z-10 text-center">
                {/* Profile Image */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-md opacity-30 group-hover:opacity-70 transition-opacity"></div>
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover border-4 border-slate-800 shadow-lg"
                  />
                </div>

                {/* Member Info */}
                <h3 className="text-2xl font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {member.name}
                </h3>

                <p className="text-sm text-blue-400 mb-4 flex items-center justify-center gap-2">
                  <span className="text-lg">{member.flag || "🌍"}</span>{" "}
                  {member.country}
                </p>

                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  <a
                    href={member.linkedin || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-slate-800 hover:bg-blue-600 text-white rounded-full transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href={`mailto:${member.email || ""}`}
                    className="w-9 h-9 flex items-center justify-center bg-slate-800 hover:bg-purple-600 text-white rounded-full transition-all duration-300 hover:scale-110"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle floating gradient blobs for depth */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
    </section>
  );
}
