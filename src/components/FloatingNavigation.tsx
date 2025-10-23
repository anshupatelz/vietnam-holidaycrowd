'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import MultiStepFormPopup from './MultiStepFormPopup';

export default function FloatingNavigation() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const btnRef = useRef<HTMLButtonElement | null>(null);

    // Close mobile menu when clicking outside
    useEffect(() => {
        function handleDocClick(e: MouseEvent) {
            const target = e.target as Node | null;
            if (!btnRef.current || !menuRef.current) return;
            if (!btnRef.current.contains(target) && !menuRef.current.contains(target)) {
                setMobileOpen(false);
            }
        }

        document.addEventListener('click', handleDocClick);
        return () => document.removeEventListener('click', handleDocClick);
    }, []);

    // Optional: wire up show-more button if it's on the page (keeps original feature intact)
    useEffect(() => {
        const showMoreBtn = document.getElementById('show-more-btn');
        const additionalPackages = document.getElementById('additional-packages');
        if (!showMoreBtn || !additionalPackages) return;

        let isExpanded = false;
        function onShowMoreClick() {
            if (!additionalPackages) return;
            if (!isExpanded) {
                additionalPackages.classList.remove('hidden');
                (showMoreBtn as HTMLButtonElement).textContent = 'Show Less';
                isExpanded = true;
                setTimeout(() => {
                    additionalPackages.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            } else {
                additionalPackages.classList.add('hidden');
                (showMoreBtn as HTMLButtonElement).textContent = 'View All Packages';
                isExpanded = false;
                (showMoreBtn as HTMLButtonElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        showMoreBtn.addEventListener('click', onShowMoreClick);
        return () => showMoreBtn.removeEventListener('click', onShowMoreClick);
    }, []);

    return (
        <>
            {/*  Floating Navigation  */}
            <nav className="fixed top-0 md:top-8 left-0 md:left-1/2 md:transform md:-translate-x-1/2 z-50 w-full md:w-max px-4 md:px-0 py-4 md:py-0">
                <div className="bg-white/95 backdrop-blur-xl md:rounded-full rounded-2xl shadow-sm border border-gray-100/50 px-5 py-3 ">
                    {/* Desktop Navigation  */}
                    <div className="hidden md:flex items-center space-x-10">
                        {/* Logo  */}
                        <div className="flex-shrink-0 mr-6">
                            <h1 className="text-lg font-light text-primary tracking-wide">
                                <Image src="/logo-dark.png" alt="HolidaysCrowd Logo" width={130} height={30} />
                            </h1>
                        </div>

                        {/* Navigation Links  */}
                        <a href="#packages"
                            className="text-gray-500 hover:text-primary px-3 py-1 text-sm font-light transition-all duration-300">Packages</a>
                        <a href="#activities"
                            className="text-gray-500 hover:text-primary px-3 py-1 text-sm font-light transition-all duration-300">Activities</a>
                        <a href="#attractions"
                            className="text-gray-500 hover:text-primary px-3 py-1 text-sm font-light transition-all duration-300">Attractions</a>
                        <a href="#videos"
                            className="text-gray-500 hover:text-primary px-3 py-1 text-sm font-light transition-all duration-300">Videos</a>
                        {/* CTA Button  */}
                        <button
                            onClick={() => setIsPopupOpen(true)}
                            className="bg-primary/90 text-white px-7 py-2 rounded-full font-light text-sm hover:bg-primary transition-all duration-300 ml-6 whitespace-nowrap cursor-pointer">
                            Book Now
                        </button>
                    </div>

                    {/* Mobile Navigation  */}
                    <div className="md:hidden flex items-center justify-between w-full">
                        {/* Logo  */}
                        <div className="flex-shrink-0">
                            <Image src="/logo-dark.png" alt="HolidaysCrowd Logo" width={110} height={25} />
                        </div>

                        {/* Mobile Menu Button  */}
                        <button
                            ref={btnRef}
                            onClick={() => setMobileOpen(v => !v)}
                            className="text-primary hover:text-gray-500 p-2 transition-colors"
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-menu"
                        >
                            {mobileOpen ? (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown  */}
                <div
                    id="mobile-menu"
                    ref={menuRef}
                    className={`md:hidden mt-3 bg-white/98 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                    <div className="flex flex-col px-2 py-3">
                        <a href="#packages"
                            onClick={() => setMobileOpen(false)}
                            className="text-gray-700 hover:text-primary hover:bg-gray-50 px-4 py-3 text-sm font-light transition-all duration-300 rounded-lg">Packages</a>
                        <a href="#activities"
                            onClick={() => setMobileOpen(false)}
                            className="text-gray-700 hover:text-primary hover:bg-gray-50 px-4 py-3 text-sm font-light transition-all duration-300 rounded-lg">Activities</a>
                        <a href="#attractions"
                            onClick={() => setMobileOpen(false)}
                            className="text-gray-700 hover:text-primary hover:bg-gray-50 px-4 py-3 text-sm font-light transition-all duration-300 rounded-lg">Attractions</a>
                        <a href="#videos"
                            onClick={() => setMobileOpen(false)}
                            className="text-gray-700 hover:text-primary hover:bg-gray-50 px-4 py-3 text-sm font-light transition-all duration-300 rounded-lg">Videos</a>
                        <div className="px-2 pt-2 pb-1">
                            <button
                                onClick={() => {
                                    setMobileOpen(false);
                                    setIsPopupOpen(true);
                                }}
                                className="bg-primary text-white px-6 py-3 rounded-full font-light text-sm hover:bg-secondary transition-all duration-300 w-full">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Multi-Step Form Popup */}
            <MultiStepFormPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
            />
        </>
    );
}