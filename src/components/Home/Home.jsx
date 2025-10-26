import React from 'react';

// Use '../' to go UP one directory from 'Home' to 'components'
import HeroSection from './HeroSection.jsx';
import FounderStorySection from './FounderStorySection';
import TeamSection from './TeamSection';
import DifferentiatorsSection from './DifferentiatorsSection';
import VisionSection from './VisionSection';

export default function Home() {
    return (
        <div className="bg-gray-900 text-white font-sans box no-space">
            <HeroSection />
            <main className="py-20 px-4 sm:px-6 lg:px-8">
                <FounderStorySection />
                <TeamSection />
                <DifferentiatorsSection />
                <VisionSection />
            </main>
        </div>
    );
}

