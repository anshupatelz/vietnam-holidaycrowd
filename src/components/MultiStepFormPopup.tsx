'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, MapPin, Users, Calendar, Hotel, User, Phone, Mail, Mountain, Waves, Church, Leaf, Heart, UserCircle } from 'lucide-react';

// Common icon props for consistent styling
const iconProps = { strokeWidth: 1 };

interface FormData {
    // Step 1
    destination: string;
    tripType: string;
    tripTheme: string;

    // Step 2
    travelers: string;
    adults: string;
    children: string;
    infants: string;
    tripDate: string;
    days: string;
    flexibleDate: boolean;
    hotelCategory: string;

    // Step 3
    location: string;
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    whatsappUpdates: boolean;
}

interface MultiStepFormPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MultiStepFormPopup({ isOpen, onClose }: MultiStepFormPopupProps) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        destination: 'Vietnam',
        tripType: '',
        tripTheme: '',
        travelers: '',
        adults: '2',
        children: '0',
        infants: '0',
        tripDate: '',
        days: '4',
        flexibleDate: false,
        hotelCategory: '',
        location: '',
        fullName: '',
        phoneNumber: '',
        emailAddress: '',
        whatsappUpdates: true,
    });

    const [otpSent, setOtpSent] = useState(false);
    const [otpValue, setOtpValue] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const totalSteps = 3;

    // Reset form when popup closes
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setCurrentStep(1);
                setOtpSent(false);
                setOtpValue('');
                setGeneratedOtp('');
                setMessage({ type: '', text: '' });
            }, 300);
        }
    }, [isOpen]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleInputChange = (field: keyof FormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validateStep = () => {
        setMessage({ type: '', text: '' });

        if (currentStep === 1) {
            if (!formData.destination.trim()) {
                setMessage({ type: 'error', text: 'Please enter a destination.' });
                return false;
            }
            if (!formData.tripType) {
                setMessage({ type: 'error', text: 'Please select a trip type.' });
                return false;
            }
            if (!formData.tripTheme) {
                setMessage({ type: 'error', text: 'Please select a trip theme.' });
                return false;
            }
        }

        if (currentStep === 2) {
            if (!formData.travelers) {
                setMessage({ type: 'error', text: 'Please select number of travelers.' });
                return false;
            }
            if (!formData.tripDate) {
                setMessage({ type: 'error', text: 'Please select your travel date.' });
                return false;
            }
            if (!formData.hotelCategory) {
                setMessage({ type: 'error', text: 'Please select your hotel preference.' });
                return false;
            }
        }

        if (currentStep === 3 && !otpSent) {
            if (!formData.location.trim()) {
                setMessage({ type: 'error', text: 'Please enter your location.' });
                return false;
            }
            if (!formData.fullName.trim()) {
                setMessage({ type: 'error', text: 'Please enter your name.' });
                return false;
            }
            if (!formData.phoneNumber || formData.phoneNumber.length !== 10) {
                setMessage({ type: 'error', text: 'Please enter a valid 10-digit phone number.' });
                return false;
            }
            if (!formData.emailAddress.trim() || !formData.emailAddress.includes('@')) {
                setMessage({ type: 'error', text: 'Please enter a valid email address.' });
                return false;
            }
        }

        return true;
    };

    const handleNext = () => {
        if (validateStep() && currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Generate 6-digit OTP
    const generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    // Send OTP
    const sendOTP = async () => {
        setIsSubmitting(true);
        setMessage({ type: '', text: '' });

        try {
            const otp = generateOTP();
            setGeneratedOtp(otp);

            // Call our Next.js API route instead of direct SMS API
            const response = await fetch('/api/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phoneNumber: formData.phoneNumber,
                    otp: otp,
                }),
            });

            const result = await response.json();
            console.log('OTP API Response:', result);

            if (result.success) {
                setOtpSent(true);
                setMessage({ type: 'success', text: 'OTP sent successfully! Please check your phone.' });

                // Auto-expire OTP after 5 minutes
                setTimeout(() => {
                    setGeneratedOtp('');
                    setOtpSent(false);
                    setMessage({ type: 'error', text: 'OTP expired. Please request a new one.' });
                }, 5 * 60 * 1000);
            } else {
                setMessage({ type: 'error', text: `Failed to send OTP: ${result.message || 'Please check your phone number'}` });
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            setMessage({ type: 'error', text: 'Error sending OTP. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Submit to CRM
    const submitToCRM = async () => {
        setIsSubmitting(true);
        setMessage({ type: '', text: '' });

        // Verify OTP
        if (otpValue !== generatedOtp) {
            setMessage({ type: 'error', text: 'Invalid OTP. Please try again.' });
            setIsSubmitting(false);
            return;
        }

        try {
            // Call our Next.js API route instead of direct CRM API
            const response = await fetch('/api/submit-crm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log('CRM API Response:', result);

            if (result.success) {
                setMessage({ type: 'success', text: '🎉 Success! Redirecting...' });
                setTimeout(() => {
                    onClose();
                    router.push('/thank-you');
                }, 1500);
            } else {
                setMessage({ type: 'error', text: 'Failed to submit. Please try again.' });
            }
        } catch (error) {
            console.error('Error submitting to CRM:', error);
            setMessage({ type: 'error', text: 'Error submitting form. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = () => {
        if (!otpSent) {
            // Validate step 3 fields before sending OTP
            if (validateStep()) {
                sendOTP();
            }
        } else {
            // Validate OTP before submitting
            if (!otpValue || otpValue.length !== 6) {
                setMessage({ type: 'error', text: 'Please enter the 6-digit OTP.' });
                return;
            }
            submitToCRM();
        }
    };

    if (!isOpen) return null;

    const tripTypes = [
        { id: 'honeymoon', label: 'Honeymoon', icon: Heart },
        { id: 'family', label: 'Family', icon: Users },
        { id: 'friends', label: 'Friends', icon: UserCircle },
        { id: 'solo', label: 'Solo', icon: User },
    ];

    const tripThemes = [
        { id: 'mountains', label: 'Mountains', icon: Mountain },
        { id: 'beaches', label: 'Beaches', icon: Waves },
        { id: 'pilgrimage', label: 'Pilgrimage', icon: Church },
        { id: 'nature', label: 'Nature', icon: Leaf },
    ];

    const hotelCategories = [
        { id: '2star', label: '2 Stars' },
        { id: '3star', label: '3 Stars' },
        { id: '4star', label: '4 Stars' },
        { id: '5star', label: '5 Stars' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex">
                {/* Left Side - Branding */}
                <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-primary/90 via-secondary/90 to-primary/90 p-12 flex-col justify-between relative overflow-hidden">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: 'url(https://holidayscrowd-assets.imgix.net/24199c3b-aedc-4fde-a465-318d11ee57dd?auto=format%2Ccompress&w=1200&q=90&fm=webp)',
                        }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-secondary/20 to-primary/10" />

                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48" />

                    <div className="relative z-10">
                        <h2 className="text-4xl font-light text-white mb-4">Holidays<br />Crowd.</h2>
                        <p className="text-white/90 font-light text-lg leading-relaxed">
                            You're few steps away from<br />your Dream Trip !
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="relative z-10 space-y-4">
                        <div className="flex items-center space-x-4">
                            {[1, 2, 3].map((step, index) => (
                                <div key={step} className="flex items-center">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${currentStep >= step
                                        ? 'bg-white border-white text-primary'
                                        : 'bg-white/10 border-white/30 text-white/50'
                                        }`}>
                                        {step}
                                    </div>
                                    {index < 2 && (
                                        <div className={`w-16 h-0.5 transition-all duration-300 ${currentStep > step ? 'bg-white' : 'bg-white/20'
                                            }`} />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="text-white/70 text-sm font-light">
                            Step {currentStep} of {totalSteps}
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="flex-1 overflow-y-auto">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-300"
                    >
                        <X {...iconProps} className="w-5 h-5 text-gray-600" />
                    </button>

                    <div className="p-8 lg:p-12">
                        {/* Mobile Progress */}
                        <div className="lg:hidden mb-8">
                            <div className="flex items-center justify-between mb-2">
                                {[1, 2, 3].map((step) => (
                                    <div key={step} className={`h-1 flex-1 rounded-full mx-1 transition-all duration-300 ${currentStep >= step ? 'bg-primary' : 'bg-gray-200'
                                        }`} />
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 font-light">Step {currentStep} of {totalSteps}</p>
                        </div>

                        {/* Success/Error Message */}
                        {message.text && (
                            <div className={`mb-6 p-4 rounded-xl ${message.type === 'success'
                                ? 'bg-green-50 border border-green-200 text-green-800'
                                : 'bg-red-50 border border-red-200 text-red-800'
                                }`}>
                                <p className="text-sm font-light">{message.text}</p>
                            </div>
                        )}

                        {/* Step 1: Destination & Preferences */}
                        {currentStep === 1 && (
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-2xl font-light text-gray-900 mb-2">Which destinations would you like to travel to?</h3>
                                </div>

                                {/* Destination Input */}
                                <div>
                                    <div className="relative">
                                        <MapPin {...iconProps} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={formData.destination}
                                            onChange={(e) => handleInputChange('destination', e.target.value)}
                                            placeholder="Enter destination"
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                {/* Trip Type */}
                                <div>
                                    <h4 className="text-lg font-light text-gray-900 mb-4">Which kind of trip are you planning?</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {tripTypes.map((type) => {
                                            const Icon = type.icon;
                                            return (
                                                <button
                                                    key={type.id}
                                                    onClick={() => handleInputChange('tripType', type.id)}
                                                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${formData.tripType === type.id
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                                        }`}
                                                >
                                                    <Icon {...iconProps} className={`w-8 h-8 mx-auto mb-2 ${formData.tripType === type.id ? 'text-primary' : 'text-gray-400'
                                                        }`} />
                                                    <p className="text-sm font-light text-gray-900">{type.label}</p>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Trip Theme */}
                                <div>
                                    <h4 className="text-lg font-light text-gray-900 mb-4">What kind of places do you want to explore?</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {tripThemes.map((theme) => {
                                            const Icon = theme.icon;
                                            return (
                                                <button
                                                    key={theme.id}
                                                    onClick={() => handleInputChange('tripTheme', theme.id)}
                                                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${formData.tripTheme === theme.id
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                                        }`}
                                                >
                                                    <Icon {...iconProps} className={`w-8 h-8 mx-auto mb-2 ${formData.tripTheme === theme.id ? 'text-primary' : 'text-gray-400'
                                                        }`} />
                                                    <p className="text-sm font-light text-gray-900">{theme.label}</p>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Travel Details */}
                        {currentStep === 2 && (
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-2xl font-light text-gray-900 mb-6">How many of you will be travelling?</h3>
                                </div>

                                {/* Travelers Count */}
                                <div className="relative">
                                    <Users {...iconProps} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <select
                                        value={formData.travelers}
                                        onChange={(e) => handleInputChange('travelers', e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 appearance-none"
                                    >
                                        <option value="">Select no. of travellers</option>
                                        <option value="1">1 Person</option>
                                        <option value="2">2 People</option>
                                        <option value="3">3 People</option>
                                        <option value="4">4 People</option>
                                        <option value="5+">5+ People</option>
                                    </select>
                                </div>

                                {/* Travel Date & Duration */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-light text-gray-700 mb-2">Your Travel Date</label>
                                        <div className="relative">
                                            <Calendar {...iconProps} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="date"
                                                value={formData.tripDate}
                                                onChange={(e) => handleInputChange('tripDate', e.target.value)}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-light text-gray-700 mb-2">Your Trip Duration</label>
                                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl">
                                            <button
                                                type="button"
                                                onClick={() => handleInputChange('days', String(Math.max(1, parseInt(formData.days) - 1)))}
                                                className="px-4 py-4 text-gray-600 hover:text-primary transition-colors"
                                            >
                                                −
                                            </button>
                                            <div className="flex-1 text-center font-light">{formData.days} Days</div>
                                            <button
                                                type="button"
                                                onClick={() => handleInputChange('days', String(parseInt(formData.days) + 1))}
                                                className="px-4 py-4 text-gray-600 hover:text-primary transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Flexible Date Checkbox */}
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.flexibleDate}
                                        onChange={(e) => handleInputChange('flexibleDate', e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <span className="text-gray-700 font-light">I'm Flexible with dates.</span>
                                </label>

                                {/* Hotel Preference */}
                                <div>
                                    <h4 className="text-lg font-light text-gray-900 mb-4">What will be your Hotel preference?</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {hotelCategories.map((category) => (
                                            <button
                                                key={category.id}
                                                onClick={() => handleInputChange('hotelCategory', category.label)}
                                                className={`p-4 rounded-2xl border-2 transition-all duration-300 ${formData.hotelCategory === category.label
                                                    ? 'border-primary bg-primary/5'
                                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                                    }`}
                                            >
                                                <Hotel {...iconProps} className={`w-6 h-6 mx-auto mb-2 ${formData.hotelCategory === category.label ? 'text-primary' : 'text-gray-400'
                                                    }`} />
                                                <p className="text-sm font-light text-gray-900">{category.label}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Personal Information */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-light text-gray-900 mb-6">I Am Travelling From</h3>
                                </div>

                                {/* Location */}
                                <div className="relative">
                                    <MapPin {...iconProps} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => handleInputChange('location', e.target.value)}
                                        placeholder="Enter City Name"
                                        disabled={otpSent}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 disabled:opacity-60"
                                    />
                                </div>

                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-light text-gray-700 mb-2">Your Name.</label>
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                                        placeholder="Name"
                                        disabled={otpSent}
                                        className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 disabled:opacity-60"
                                    />
                                </div>

                                {/* WhatsApp Checkbox */}
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.whatsappUpdates}
                                        onChange={(e) => handleInputChange('whatsappUpdates', e.target.checked)}
                                        disabled={otpSent}
                                        className="w-5 h-5 rounded-full border-gray-300 text-primary focus:ring-primary disabled:opacity-60"
                                    />
                                    <span className="text-gray-700 font-light">Whatsapp my trip updates on this no.</span>
                                </label>

                                {/* Phone & Email */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-light text-gray-700 mb-2">Your Phone Number.</label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center space-x-2 pointer-events-none">
                                                <Phone {...iconProps} className="w-5 h-5 text-gray-400" />
                                                <span className="text-gray-600 font-light">+91</span>
                                            </div>
                                            <input
                                                type="tel"
                                                value={formData.phoneNumber}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '');
                                                    if (value.length <= 10) {
                                                        handleInputChange('phoneNumber', value);
                                                    }
                                                }}
                                                placeholder="9876543210"
                                                maxLength={10}
                                                disabled={otpSent}
                                                className="w-full pl-24 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 disabled:opacity-60"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1 font-light">India (+91)</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-light text-gray-700 mb-2">Your E-Mail Id.</label>
                                        <div className="relative">
                                            <Mail {...iconProps} className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                value={formData.emailAddress}
                                                onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                                                placeholder="Enter E-mail Here"
                                                disabled={otpSent}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 disabled:opacity-60"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* OTP Input */}
                                {otpSent && (
                                    <div>
                                        <label className="block text-sm font-light text-gray-700 mb-2">Enter OTP</label>
                                        <input
                                            type="text"
                                            value={otpValue}
                                            onChange={(e) => setOtpValue(e.target.value)}
                                            placeholder="Enter 6-digit OTP"
                                            maxLength={6}
                                            className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                        />
                                        <p className="text-xs text-gray-500 mt-2 font-light">
                                            OTP is valid for 5 minutes. Didn't receive?
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setOtpSent(false);
                                                    setOtpValue('');
                                                    setMessage({ type: '', text: '' });
                                                }}
                                                className="ml-1 text-primary underline hover:text-secondary"
                                            >
                                                Resend OTP
                                            </button>
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-200">
                            {currentStep > 1 && (
                                <button
                                    onClick={handleBack}
                                    className="px-8 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-light hover:border-gray-400 transition-all duration-300"
                                >
                                    ← Back
                                </button>
                            )}

                            <div className="flex-1" />

                            {currentStep < totalSteps ? (
                                <button
                                    onClick={handleNext}
                                    className="px-8 py-3 rounded-full bg-primary text-white font-light hover:bg-secondary transition-all duration-300 shadow-lg"
                                >
                                    Next →
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="px-8 py-3 rounded-full bg-primary text-white font-light hover:bg-secondary transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting
                                        ? 'Submitting...'
                                        : otpSent
                                            ? 'Submit ✓'
                                            : 'Send OTP'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
