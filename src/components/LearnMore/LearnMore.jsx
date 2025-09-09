import React from 'react';

// --- SVG Icon Components ---
// Using inline SVGs is a great practice for performance and scalability.
const CodeBracketIcon = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
  </svg>
);

const UsersIcon = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.513-.96 1.487-1.591 2.571-1.82m-2.571 1.82a9.094 9.094 0 01-3.741-.479 3 3 0 01-4.682-2.72m7.5-2.962c-.513-.96-1.487-1.591-2.571-1.82m11.486-1.486A9.095 9.095 0 0012 8c-1.079 0-2.112.183-3.078.513m5.744 2.261A9.095 9.095 0 0112 16c-1.079 0-2.112-.183-3.078-.513m5.744-2.261c.513.96 1.487 1.591 2.571 1.82m-2.571-1.82a9.094 9.094 0 003.741.479 3 3 0 004.682 2.72m-7.5 2.962c-.513.96-1.487 1.591-2.571 1.82m-2.571-1.82A9.094 9.094 0 013.741 16.28a3 3 0 01-4.682 2.72m7.5 2.962c.513.96 1.487 1.591 2.571 1.82" />
  </svg>
);

const RocketLaunchIcon = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a15.953 15.953 0 00-5.84-2.56m0 0a15.953 15.953 0 01-5.84 2.56m5.84-2.56v-4.82a6 6 0 015.84-7.38v4.82z" />
  </svg>
);

const LightBulbIcon = ({ className = "w-8 h-8" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-11.62a6.01 6.01 0 00-1.5-11.62m0 0A2.25 2.25 0 009.75 6v1.5m0 0a2.25 2.25 0 01-2.25 2.25m0 0a2.25 2.25 0 00-2.25 2.25m2.25 2.25v-1.5m0 0a2.25 2.25 0 002.25 2.25m0 0a2.25 2.25 0 012.25 2.25m0 0a2.25 2.25 0 002.25 2.25M12 18a2.25 2.25 0 002.25-2.25m-2.25 2.25a2.25 2.25 0 01-2.25-2.25m0 0A2.25 2.25 0 019.75 12v-1.5m0 0a2.25 2.25 0 00-2.25-2.25m2.25-2.25a2.25 2.25 0 012.25-2.25" />
    </svg>
);


// --- Feature Card Component ---
const FeatureCard = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{children}</p>
  </div>
);


// --- Main LearnMore Component ---
export default function LearnMore() {
  const features = [
    {
      icon: <UsersIcon />,
      title: "Community Driven",
      description: "Connect with developers, share ideas, and build amazing things together in a collaborative, open-source environment."
    },
    {
      icon: <CodeBracketIcon />,
      title: "Project Scaffolding",
      description: "Get a head start with our powerful CLI tools that generate boilerplate code for various stacks, saving you time and effort."
    },
    {
      icon: <RocketLaunchIcon />,
      title: "Instant Deployment",
      description: "Seamlessly deploy your projects to the cloud with our integrated CI/CD pipelines, making your work instantly accessible."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        
        {/* Header Section */}
        <header className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight mb-4">
            Build the Future of Open Source.
          </h1>
          <p className="text-lg sm:text-xl text-slate-600">
            OpenStart is a launchpad designed to help you initiate, collaborate on, and scale your open-source projects faster than ever before.
          </p>
        </header>

        {/* Features Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <FeatureCard key={feature.title} icon={feature.icon} title={feature.title}>
                {feature.description}
              </FeatureCard>
            ))}
          </div>
        </section>

        {/* Future Goals Section */}
        <section className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-sm max-w-4xl mx-auto text-center mb-16">
           <div className="flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 text-amber-600 mb-6 mx-auto">
             <LightBulbIcon className="w-10 h-10" />
           </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Roadmap for Tomorrow</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            We're constantly innovating. Our future plans include AI-powered code suggestions, deeper integration with version control platforms like GitHub and GitLab, and advanced analytics to help you track your project's health and community engagement.
          </p>
        </section>
        
        {/* Call to Action Section */}
        <footer className="text-center">
          <a
            href="/"
            className="inline-block bg-indigo-600 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 transform hover:scale-105"
          >
            Start Your Project Now
          </a>
        </footer>

      </div>
    </div>
  );
}
