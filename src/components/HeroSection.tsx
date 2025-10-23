// using a native video element for the background to allow autoplayed muted loop

'use client';

import { useState, useEffect, useRef } from 'react';
import MultiStepFormPopup from './MultiStepFormPopup';

// Extend Window type to include YT
declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

export default function HeroSection() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const playerRef = useRef<any>(null);
    const playerContainerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <section className="relative min-h-screen flex items-end justify-center overflow-hidden">
                {/* Background Video */}
                <div className="absolute inset-0 z-0">
                    <video
                        className="absolute inset-0 w-full h-full object-cover"
                        poster="/hero-image.jpg"
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-hidden="true"
                    >
                        <source src="/vietnam-hero-section-holidaycrowd-1080p.mp4" type="video/mp4" />
                        {/* Fallback to poster image for browsers that don't support video */}
                    </video>

                    {/* Gradient Overlays for better content visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                </div>

                {/* Hero Content - Positioned towards bottom */}
                <div className="relative z-10 w-full pb-16 pt-48 md:pt-56">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight tracking-wide">
                            Vietnam Tour Packages
                        </h1>
                        <p
                            className="text-lg md:text-xl lg:text-2xl mb-12 opacity-90 max-w-3xl mx-auto font-light leading-relaxed">
                            From the misty mountains of Sapa to the emerald waters of Ha Long Bay — discover Vietnam’s timeless beauty with our expertly curated tour packages.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <button
                                onClick={() => setIsPopupOpen(true)}
                                className="bg-white/95 text-primary px-10 py-4 rounded-full font-light text-base hover:bg-white transition-all duration-300 shadow-sm backdrop-blur-sm cursor-pointer">
                                Explore Vietnam
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="animate-bounce opacity-60">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </div>
                </div>
            </section>

            {/* Multi-Step Form Popup */}
            <MultiStepFormPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
            />
        </>
    );
}