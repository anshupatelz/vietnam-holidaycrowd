'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Home, Phone, Mail } from 'lucide-react';

export default function ThankYouPage() {
    const router = useRouter();

    useEffect(() => {
        // Optional: Auto redirect to home after 10 seconds
        const timer = setTimeout(() => {
            router.push('/');
        }, 10000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center p-4">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48" />

            <div className="relative z-10 max-w-2xl mx-auto text-center">
                {/* Success Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
                        <CheckCircle className="relative w-24 h-24 text-white" strokeWidth={1} />
                    </div>
                </div>

                {/* Main Message */}
                <h1 className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight">
                    Thank You!
                </h1>
                <p className="text-xl md:text-2xl text-white/90 font-light mb-8 leading-relaxed">
                    Your trip request has been submitted successfully.
                </p>
                <p className="text-lg text-white/80 font-light mb-12 max-w-xl mx-auto">
                    Our travel experts will review your requirements and get back to you within 24 hours with a customized Vietnam tour package.
                </p>

                {/* Contact Info */}
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-8">
                    <p className="text-white/90 font-light mb-6">
                        Need immediate assistance?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="tel:+918287783891"
                            className="flex items-center gap-3 bg-white text-primary px-6 py-3 rounded-full font-light hover:bg-white/90 transition-all duration-300"
                        >
                            <Phone strokeWidth={1.5} className="w-5 h-5" />
                            <span>+91 8287783891</span>
                        </a>
                        <a
                            href="https://wa.me/918287783891?text=Hi, I just submitted a trip request"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-full font-light hover:bg-[#20BD5A] transition-all duration-300"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            <span>WhatsApp Us</span>
                        </a>
                    </div>
                </div>

                {/* Back to Home Button */}
                <button
                    onClick={() => router.push('/')}
                    className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-light hover:bg-white/30 transition-all duration-300 border border-white/30"
                >
                    <Home strokeWidth={1.5} className="w-5 h-5" />
                    <span>Back to Home</span>
                </button>

                <p className="text-white/60 text-sm font-light mt-8">
                    Redirecting to home page in 10 seconds...
                </p>
            </div>
        </div>
    );
}
