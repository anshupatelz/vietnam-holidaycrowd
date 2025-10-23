'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from 'react';

export default function TestimonialsSection() {
    // Static total testimonials based on markup
    const totalTestimonials = 6;
    const trackRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
    const touchStartX = useRef<number | null>(null);

    const getPerView = () => {
        if (typeof window === 'undefined') return 1;
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    };

    const [perView, setPerView] = useState<number>(getPerView());
    const [currentSlide, setCurrentSlide] = useState<number>(0); // index of group

    // total groups where the slider can start (sliding window)
    const totalGroups = Math.max(1, totalTestimonials - perView + 1);

    const updateTrack = (instant = false) => {
        const track = trackRef.current;
        if (!track) return;
        const slideWidth = 100 / perView;
        const offset = currentSlide * slideWidth;
        track.style.transition = instant ? 'none' : 'transform 500ms ease-in-out';
        track.style.transform = `translateX(-${offset}%)`;
    };

    const nextSlide = () => setCurrentSlide(s => Math.min(s + 1, totalGroups - 1));
    const prevSlide = () => setCurrentSlide(s => Math.max(s - 1, 0));
    const goTo = (index: number) => setCurrentSlide(Math.max(0, Math.min(index, totalGroups - 1)));

    // autoplay
    const startAuto = () => {
        stopAuto();
        autoPlayRef.current = setInterval(() => {
            setCurrentSlide(s => (s < totalGroups - 1 ? s + 1 : 0));
        }, 6000);
    };
    const stopAuto = () => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = null;
        }
    };

    // handle resize
    useEffect(() => {
        let t: NodeJS.Timeout;
        const onResize = () => {
            clearTimeout(t);
            t = setTimeout(() => setPerView(getPerView()), 200);
        };
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
            clearTimeout(t);
        };
    }, []);

    // update track when currentSlide or perView changes
    useEffect(() => {
        updateTrack();
    }, [currentSlide, perView]);

    // autoplay and hover pause
    useEffect(() => {
        startAuto();
        const container = containerRef.current;
        if (!container) return () => stopAuto();

        const onEnter = () => stopAuto();
        const onLeave = () => startAuto();
        container.addEventListener('mouseenter', onEnter);
        container.addEventListener('mouseleave', onLeave);

        return () => {
            stopAuto();
            container.removeEventListener('mouseenter', onEnter);
            container.removeEventListener('mouseleave', onLeave);
        };
    }, [perView, totalGroups]);

    // touch support
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const onTouchStart = (e: TouchEvent) => {
            touchStartX.current = e.touches[0].clientX;
        };
        const onTouchEnd = (e: TouchEvent) => {
            if (touchStartX.current == null) return;
            const endX = e.changedTouches[0].clientX;
            const diff = touchStartX.current - endX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) nextSlide(); else prevSlide();
            }
            touchStartX.current = null;
        };

        track.addEventListener('touchstart', onTouchStart);
        track.addEventListener('touchend', onTouchEnd);
        return () => {
            track.removeEventListener('touchstart', onTouchStart);
            track.removeEventListener('touchend', onTouchEnd);
        };
    }, [perView, totalGroups]);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-primary mb-6 tracking-wide">
                        What Our Travelers Say
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        <h3 className="text-xl md:text-2xl font-light text-gray-700 mb-4 leading-relaxed">
                            Real Reviews from Real Adventures
                        </h3>
                    </div>
                </div>

                {/* Testimonials Carousel */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        aria-label="Previous testimonials"
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 -ml-6">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        aria-label="Next testimonials"
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 -mr-6">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Carousel Container */}
                    <div className="testimonials-carousel overflow-hidden" ref={containerRef}>
                        <div id="testimonials-track"
                            ref={trackRef}
                            className="testimonials-track flex transition-transform duration-500 ease-in-out">

                            {/* Testimonial 1 */}
                            <div className="testimonial-slide flex-none w-full md:w-1/2 lg:w-1/3 px-4">
                                <div
                                    className="group bg-gray-50/50 rounded-3xl p-8 hover:shadow-lg transition-all duration-500 border border-gray-100 hover:bg-white">
                                    {/* Google Logo */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path fill="#4285F4"
                                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853"
                                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05"
                                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335"
                                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                            <span className="text-sm font-medium text-gray-600">Google Review</span>
                                        </div>
                                        {/* Rating Stars */}
                                        <div className="flex items-center space-x-1">
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Review Text */}
                                    <blockquote className="text-gray-700 font-light leading-relaxed mb-6 text-base">
                                        "Nice and memorable trip planned by Vikas and his team. Thanks to Holiday crowd. Best experience in at very decent price.Big shout out to Vikas for hassle free bookings."
                                    </blockquote>

                                    {/* User Profile */}
                                    <div className="flex items-center space-x-4">
                                        {/* <Image
                                            src="https://images.unsplash.com/photo-1494790108755-2616b612b367?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                                            alt="Sarah Mitchell"
                                            width={800}
                                            height={600}
                                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-100">
                                        </Image> */}
                                        <div>
                                            <h4 className="text-sm font-medium text-primary">Reishav Mukharjii</h4>
                                            <p className="text-xs text-gray-500 font-light">Verified Google User</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial 2 */}
                            <div className="testimonial-slide flex-none w-full md:w-1/2 lg:w-1/3 px-4">
                                <div
                                    className="group bg-gray-50/50 rounded-3xl p-8 hover:shadow-lg transition-all duration-500 border border-gray-100 hover:bg-white">
                                    {/* Google Logo */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path fill="#4285F4"
                                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853"
                                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05"
                                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335"
                                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                            <span className="text-sm font-medium text-gray-600">Google Review</span>
                                        </div>
                                        {/* Rating Stars */}
                                        <div className="flex items-center space-x-1">
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Review Text */}
                                    <blockquote className="text-gray-700 font-light leading-relaxed mb-6 text-base">
                                        "I booked the total one-week trip including 4 days and 3 nights. We got the best price deals for hotels as well as for our round flight ticket. Thanks Team Holidays Crowd!!"
                                    </blockquote>

                                    {/* User Profile */}
                                    <div className="flex items-center space-x-4">
                                        {/* <Image
                                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                                            alt="Mike Chen"
                                            width={800}
                                            height={600}
                                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-100">
                                        </Image> */}
                                        <div>
                                            <h4 className="text-sm font-medium text-primary">Kuldeep Maurya</h4>
                                            <p className="text-xs text-gray-500 font-light">Verified Google User</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial 3 */}
                            <div className="testimonial-slide flex-none w-full md:w-1/2 lg:w-1/3 px-4">
                                <div
                                    className="group bg-gray-50/50 rounded-3xl p-8 hover:shadow-lg transition-all duration-500 border border-gray-100 hover:bg-white">
                                    {/* Google Logo */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path fill="#4285F4"
                                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853"
                                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05"
                                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335"
                                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                            <span className="text-sm font-medium text-gray-600">Google Review</span>
                                        </div>
                                        {/* Rating Stars */}
                                        <div className="flex items-center space-x-1">
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Review Text */}
                                    <blockquote className="text-gray-700 font-light leading-relaxed mb-6 text-base">
                                        "Holidays crowd provided us with the best package. Hotels provided were good and in the best location, staff was also friendly. The cab service and drivers were also helpful."
                                    </blockquote>

                                    {/* User Profile */}
                                    <div className="flex items-center space-x-4">
                                        {/* <Image
                                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                                            alt="Priya Sharma"
                                            width={800}
                                            height={600}
                                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-100">
                                        </Image> */}
                                        <div>
                                            <h4 className="text-sm font-medium text-primary">Md Arman Malik</h4>
                                            <p className="text-xs text-gray-500 font-light">Verified Google User</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial 4 */}
                            <div className="testimonial-slide flex-none w-full md:w-1/2 lg:w-1/3 px-4">
                                <div
                                    className="group bg-gray-50/50 rounded-3xl p-8 hover:shadow-lg transition-all duration-500 border border-gray-100 hover:bg-white">
                                    {/* Google Logo */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path fill="#4285F4"
                                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853"
                                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05"
                                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335"
                                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                            <span className="text-sm font-medium text-gray-600">Google Review</span>
                                        </div>
                                        {/* Rating Stars */}
                                        <div className="flex items-center space-x-1">
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Review Text */}
                                    <blockquote className="text-gray-700 font-light leading-relaxed mb-6 text-base">
                                        "We had an amazing time in our Vietnam trip with Holidays crowd. I would definitely recommend this company to anyone looking for a great travel experience."
                                    </blockquote>

                                    {/* User Profile */}
                                    <div className="flex items-center space-x-4">
                                        {/* <Image
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                                            alt="James Wilson"
                                            width={800}
                                            height={600}
                                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-100">
                                        </Image> */}
                                        <div>
                                            <h4 className="text-sm font-medium text-primary">Dev A</h4>
                                            <p className="text-xs text-gray-500 font-light">Verified Google User</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Carousel Indicators */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {Array.from({ length: Math.max(1, totalGroups) }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => goTo(idx)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-primary' : 'bg-primary/30 hover:bg-primary/60'}`}
                                aria-label={`Go to testimonials group ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
