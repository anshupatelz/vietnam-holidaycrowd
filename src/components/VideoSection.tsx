'use client';

import { useEffect, useRef, useState } from 'react';
import MultiStepFormPopup from './MultiStepFormPopup';

export default function VideoSection() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const videoModalRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalSrc, setModalSrc] = useState('');

    const totalReels = 8; // Updated to match available videos
    const getPerView = () => {
        if (typeof window === 'undefined') return 1;
        if (window.innerWidth >= 1024) return 4; // Desktop: 4
        if (window.innerWidth >= 768) return 2;  // Tablet: 2
        return 1; // Mobile: 1
    };

    const [perView, setPerView] = useState(getPerView());
    const [currentIndex, setCurrentIndex] = useState(0);

    // Video data using actual Vietnam videos - using video first frame as poster
    const videoData: Record<string, { src: string }> = {
        video1: {
            src: '/vietnam-videos/Vietnam-HolidaysCrowd-Instagram-reel1.mp4'
        },
        video2: {
            src: '/vietnam-videos/Vietnam-HolidaysCrowd-Instagram-reel2.mp4'
        },
        video3: {
            src: '/vietnam-videos/Vietnam-HolidaysCrowd-Instagram-reel3.mp4'
        },
        video4: {
            src: '/vietnam-videos/Vietnam-HolidaysCrowd-Instagram-reel4.mp4'
        },
        video5: {
            src: '/vietnam-videos/Vietnam-HolidaysCrowd-Instagram-reel5.mp4'
        },
        video6: {
            src: '/vietnam-videos/Vietnam-HolidaysCrowd-Instagram-reel6.mp4'
        },
        video7: {
            src: '/vietnam-videos/Vietnam-HolidaysCrowd-Instagram-reel7.mp4'
        },
    };

    // Play video in modal
    const playVideo = (id: string) => {
        const v = videoData[id];
        if (!v) return;
        setModalSrc(v.src);
        setModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeVideo = () => {
        setModalOpen(false);
        if (videoRef.current) {
            videoRef.current.pause();
            try { videoRef.current.currentTime = 0; } catch { }
            videoRef.current.src = '';
        }
        document.body.style.overflow = 'auto';
    };

    // When modal opens, load and play video
    useEffect(() => {
        if (modalOpen && videoRef.current) {
            videoRef.current.src = modalSrc;
            videoRef.current.load();
            const p = videoRef.current.play();
            if (p && typeof p.then === 'function') p.catch(() => { /* autoplay blocked */ });
        }
    }, [modalOpen, modalSrc]);

    // close on escape or click outside
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape' && modalOpen) closeVideo();
        }
        function onDocClick(e: MouseEvent) {
            if (!modalOpen) return;
            if (!videoModalRef.current) return;
            if (e.target && videoModalRef.current === e.target) closeVideo();
        }
        document.addEventListener('keydown', onKey);
        document.addEventListener('click', onDocClick);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('click', onDocClick);
        };
    }, [modalOpen]);

    // Carousel controls (true infinite scroll with cloning)
    const updateCarousel = (instant = false) => {
        if (!trackRef.current) return;
        const track = trackRef.current;
        const children = Array.from(track.children) as HTMLElement[];

        // Calculate position based on actual index (can go beyond bounds)
        const actualIndex = currentIndex % totalReels;
        const displayIndex = actualIndex < 0 ? totalReels + actualIndex : actualIndex;

        // Find the middle clone set (index + totalReels)
        const targetIndex = displayIndex + totalReels;
        const target = children[targetIndex];

        if (!target) return;

        if (instant) track.style.transition = 'none';
        else track.style.transition = 'transform 500ms ease-in-out';

        const offset = target.offsetLeft;
        track.style.transform = `translateX(-${offset}px)`;

        if (instant) {
            requestAnimationFrame(() => {
                if (track) track.style.transition = 'transform 500ms ease-in-out';
            });
        }
    };

    useEffect(() => {
        updateCarousel();
    }, [currentIndex, perView]);

    // Reset position when reaching boundaries (seamless infinite loop)
    useEffect(() => {
        if (!trackRef.current) return;
        const track = trackRef.current;

        const handleTransitionEnd = () => {
            const actualIndex = currentIndex % totalReels;
            const displayIndex = actualIndex < 0 ? totalReels + actualIndex : actualIndex;

            // If we're at the beginning or end clones, reset to the middle set
            if (currentIndex >= totalReels * 2 || currentIndex < 0) {
                // Instantly move to the equivalent position in the middle set
                setCurrentIndex(displayIndex);
                setTimeout(() => updateCarousel(true), 0);
            }
        };

        track.addEventListener('transitionend', handleTransitionEnd);
        return () => track.removeEventListener('transitionend', handleTransitionEnd);
    }, [currentIndex, totalReels]);

    // Auto-play (truly infinite)
    const autoPlayRef = useRef<number | null>(null);
    const startAutoPlay = () => {
        stopAutoPlay();
        autoPlayRef.current = window.setInterval(() => {
            setCurrentIndex(i => i + 1);
        }, 8000);
    };
    const stopAutoPlay = () => {
        if (autoPlayRef.current != null) { clearInterval(autoPlayRef.current); autoPlayRef.current = null; }
    };

    useEffect(() => {
        startAutoPlay();
        return () => stopAutoPlay();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Pause on hover
    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;
        const onEnter = () => stopAutoPlay();
        const onLeave = () => startAutoPlay();
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
        return () => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave); };
    }, []);

    // Touch support (seamless infinite swipe)
    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;
        let startX: number | null = null;
        let startY: number | null = null;
        const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; };
        const onEnd = (e: TouchEvent) => {
            if (startX == null || startY == null) return;
            const endX = e.changedTouches[0].clientX; const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX; const diffY = startY - endY;
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) nextGroup();
                else prevGroup();
            }
            startX = null; startY = null;
        };
        el.addEventListener('touchstart', onStart);
        el.addEventListener('touchend', onEnd);
        return () => { el.removeEventListener('touchstart', onStart); el.removeEventListener('touchend', onEnd); };
    }, []);

    // Handle resize -> recalc perView
    useEffect(() => {
        let t: number | undefined;
        const onResize = () => { if (t) window.clearTimeout(t); t = window.setTimeout(() => setPerView(getPerView()), 200); };
        window.addEventListener('resize', onResize);
        return () => { window.removeEventListener('resize', onResize); if (t) window.clearTimeout(t); };
    }, []);

    const prevGroup = () => {
        setCurrentIndex(i => i - 1);
    };

    const nextGroup = () => {
        setCurrentIndex(i => i + 1);
    };

    // Create array of video items for rendering
    const videoItems = Object.entries(videoData).map(([id, data]) => ({
        id,
        src: data.src
    }));

    return (
        <>
            <section id="videos" className="py-0 bg-gray-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-primary mb-6 tracking-wide">
                            Videos
                        </h2>
                        <div className="max-w-4xl mx-auto">
                            <h3 className="text-xl md:text-2xl font-light text-gray-700 mb-4 leading-relaxed">
                                See Vietnam Through Our Travelers' Eyes
                            </h3>
                        </div>
                    </div>

                    {/* Video Reels Carousel */}
                    <div className="relative">
                        {/* Carousel Container */}
                        <div className="overflow-hidden" ref={carouselRef}>
                            <div ref={trackRef} className="flex transition-transform duration-500 ease-in-out">
                                {/* Render videos 3 times for infinite scroll effect */}
                                {[...videoItems, ...videoItems, ...videoItems].map((video, index) => (
                                    <div key={`${video.id}-${index}`} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/4 px-3">
                                        <div className="group cursor-pointer" onClick={() => playVideo(video.id)}>
                                            <div className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-black">
                                                {/* Video Thumbnail - Shows first frame */}
                                                <video
                                                    src={video.src}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                    muted
                                                    playsInline
                                                    preload="metadata"
                                                />

                                                {/* Gradient Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>

                                                {/* Play Button */}
                                                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                                                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M8 5v14l11-7z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Carousel Controls */}
                        <div className="flex justify-center mt-8 space-x-4">
                            {/* Previous Button */}
                            <button onClick={prevGroup}
                                className="bg-white/10 backdrop-blur-md border border-white/20 text-primary p-3 rounded-full hover:bg-white/20 transition-all duration-300 shadow-lg">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"></path>
                                </svg>
                            </button>

                            {/* Indicators - One dot per video */}
                            <div className="flex space-x-2 items-center">
                                {Array.from({ length: totalReels }).map((_, videoIdx) => {
                                    // Calculate actual position in the original video array
                                    const actualIndex = currentIndex % totalReels;
                                    const normalizedIndex = actualIndex < 0 ? totalReels + actualIndex : actualIndex;

                                    return (
                                        <div
                                            key={videoIdx}
                                            onClick={() => setCurrentIndex(videoIdx)}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${videoIdx === normalizedIndex ? 'bg-primary' : 'bg-gray-300'}`}
                                        />
                                    );
                                })}
                            </div>                            {/* Next Button */}
                            <button onClick={nextGroup}
                                className="bg-white/10 backdrop-blur-md border border-white/20 text-primary p-3 rounded-full hover:bg-white/20 transition-all duration-300 shadow-lg">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <button
                            onClick={() => setIsPopupOpen(true)}
                            className="bg-primary text-white px-8 py-4 rounded-full font-light text-lg hover:bg-secondary transition-all duration-300 shadow-sm cusror-pointer">
                            Book A Tour
                        </button>
                    </div>
                </div>
            </section>

            {/* Video Modal - Optimized for 9:16 Instagram Reel Size */}
            <div ref={videoModalRef} onClick={closeVideo} className={`fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 ${modalOpen ? '' : 'hidden'}`}>
                <div className="relative w-full max-w-md mx-auto" onClick={(e) => e.stopPropagation()}>
                    <button onClick={closeVideo}
                        className="absolute -top-12 right-0 bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition-colors z-10">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
                        <div className="aspect-[9/16] bg-black">
                            <video ref={videoRef} className="w-full h-full object-contain" controls playsInline>
                                <source src="" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </div>

            {/* Multi-Step Form Popup */}
            <MultiStepFormPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
            />
        </>
    );
}