'use client';
import { useState } from 'react';
import MultiStepFormPopup from './MultiStepFormPopup';

export default function WhyChooseUsSection() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    function handleCallClick() {
        window.location.href = 'tel:+918287783891';
    }

    return (
        <>
            <section id="about" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-primary mb-6 tracking-wide">
                            Why Choose Us
                        </h2>
                        <div className="max-w-4xl mx-auto">
                            <h3 className="text-xl md:text-2xl font-light text-gray-700 mb-4 leading-relaxed">
                                Why 25,000+ Travelers Trust Us With Their Dream Vacations?
                            </h3>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

                        {/* Feature 1: Best Price Guaranteed */}
                        <div
                            className="group p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-gray-50/50 to-white">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div
                                        className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1">
                                            </path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-medium text-primary mb-3">1. Best Price Guaranteed</h3>
                                    <p className="text-base font-light text-gray-700 mb-3 italic">
                                        "Find a lower price? We'll match it + give you ₹5,000 extra credit"
                                    </p>
                                    <p className="text-sm font-light text-gray-600 leading-relaxed">
                                        No hidden fees. What you see is what you pay. Period.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 2: 24/7 Travel Support */}
                        <div
                            className="group p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-gray-50/50 to-white">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div
                                        className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                                            </path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-medium text-primary mb-3">2. 24/7 Travel Support</h3>
                                    <p className="text-base font-light text-gray-700 mb-3 italic">
                                        "Your dedicated trip advisor is just a call away"
                                    </p>
                                    <p className="text-sm font-light text-gray-600 leading-relaxed">
                                        From booking to landing back home, we're with you every step.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 3: 100% Customizable */}
                        <div
                            className="group p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-gray-50/50 to-white">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div
                                        className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4">
                                            </path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-medium text-primary mb-3">3. 100% Customizable</h3>
                                    <p className="text-base font-light text-gray-700 mb-3 italic">
                                        "Your trip, your way - modify anything, anytime"
                                    </p>
                                    <p className="text-sm font-light text-gray-600 leading-relaxed">
                                        Don't compromise. Get exactly what you want within your budget.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 4: Safe & Secure Booking */}
                        <div
                            className="group p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-gray-50/50 to-white">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div
                                        className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                                            </path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-medium text-primary mb-3">4. Safe & Secure Booking</h3>
                                    <p className="text-base font-light text-gray-700 mb-3 italic">
                                        "IATA certified with comprehensive travel insurance"
                                    </p>
                                    <p className="text-sm font-light text-gray-600 leading-relaxed">
                                        Travel worry-free with our complete protection coverage.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 5: Expert Local Guides */}
                        <div
                            className="group p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-gray-50/50 to-white">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div
                                        className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                            </path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-medium text-primary mb-3">5. Expert Local Guides</h3>
                                    <p className="text-base font-light text-gray-700 mb-3 italic">
                                        "Discover hidden gems only locals know"
                                    </p>
                                    <p className="text-sm font-light text-gray-600 leading-relaxed">
                                        Skip tourist traps. Experience authentic Vietnam through local eyes.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 6: Flexible Cancellation */}
                        <div
                            className="group p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-gray-50/50 to-white">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div
                                        className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                                            </path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-medium text-primary mb-3">6. Flexible Cancellation</h3>
                                    <p className="text-base font-light text-gray-700 mb-3 italic">
                                        "Free cancellation up to 48 hours before departure"
                                    </p>
                                    <p className="text-sm font-light text-gray-600 leading-relaxed">
                                        Plans change. We get it. That's why we offer full flexibility.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Bottom CTA */}
                    <div className="text-center mt-16">
                        <div
                            className="bg-gradient-to-br from-primary/5 to-gray-50 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
                            <h3 className="text-2xl md:text-3xl font-light text-primary mb-4">
                                Ready to Experience the Difference?
                            </h3>
                            <p className="text-lg text-gray-600 font-light mb-8 max-w-2xl mx-auto">
                                Join thousands of satisfied travelers who chose HolidaysCrowd for their dream Vietnam vacation.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => setIsPopupOpen(true)}
                                    className="bg-primary text-white px-8 py-4 rounded-full font-light text-lg hover:bg-secondary transition-all duration-300 shadow-sm cursor-pointer">
                                    Get Custom Quote
                                </button>
                                <button
                                    onClick={handleCallClick}
                                    className="border-2 border-primary text-primary px-8 py-4 rounded-full font-light text-lg hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
                                    Call Us Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <MultiStepFormPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
            />
        </>
    );
}