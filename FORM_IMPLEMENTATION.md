# Multi-Step Form Implementation

## Overview
A beautiful multi-step form popup has been added to collect detailed trip information from users before submitting to your Sembark CRM with OTP verification.

## Features Implemented

### 🎨 Design
- Matches your landing page aesthetic (dark theme, rounded corners, light font)
- Responsive design (mobile & desktop)
- Beautiful gradient left panel with progress indicators
- Smooth transitions and animations
- Uses Lucide icons throughout

### 📋 Form Steps

#### Step 1: Destination & Preferences
- Destination input (default: Bali)
- Trip type selection: Honeymoon, Family, Friends, Solo
- Trip theme selection: Mountains, Beaches, Pilgrimage, Nature

#### Step 2: Travel Details
- Number of travelers selector
- Travel date picker
- Trip duration counter (with +/- buttons)
- Flexible dates checkbox
- Hotel preference: 2★, 3★, 4★, 5★

#### Step 3: Personal Information & Verification
- Traveling from (location)
- Full name
- WhatsApp updates checkbox
- Phone number
- Email address
- **OTP Verification**
  - Sends 6-digit OTP via SMS API
  - OTP valid for 5 minutes
  - Resend OTP option

### 🔐 Security
- Mobile OTP verification before form submission
- Auto-expiring OTP (5 minutes)
- Form fields disabled after OTP sent (prevents data tampering)

### 🚀 CRM Integration
After successful OTP verification, form submits to:
```
https://api.sembark.com/integrations/v1/trip-plan-requests
```

With all collected parameters:
- name, phone_number, email
- start_date, no_of_days
- no_of_adults, no_of_children, no_of_infant
- destination, Hotelcategory
- flexibleDate, whatsapp
- Triptheme, Guest'slocation
- client_request_uid (auto-generated)

### 🎯 Trigger Points
The popup can be opened from:
1. **Hero Section** - "Explore Bali" button
2. **Footer Section** - "Plan Your Custom Trip →" button

### 📱 User Experience
- Progress indicator on each step
- Back/Next navigation
- Form validation
- Success/Error messages
- Auto-close on successful submission
- Body scroll lock when popup is open
- Click outside to close

## Files Modified/Created

### New File
- `src/components/MultiStepFormPopup.tsx` - Main popup component

### Modified Files
- `src/components/FooterSection.tsx` - Added popup trigger button
- `src/components/HeroSection.tsx` - Added popup trigger to CTA button

## Dependencies Added
- `lucide-react` - Icon library

## Usage

The popup is already integrated. Users can click:
- "Explore Bali" button in hero section
- "Plan Your Custom Trip →" button in footer section

## Design Guidelines Followed
✅ Dark primary color (#1a1a1a)
✅ Light font weights (font-light)
✅ Rounded corners (rounded-2xl, rounded-3xl)
✅ Backdrop blur effects
✅ White/transparent overlays
✅ Smooth transitions (duration-300)
✅ Consistent spacing and padding
✅ Responsive grid layouts

## API Configuration
- **SMS API**: Savshka API for OTP delivery
- **CRM API**: Sembark integration API
- **Authorization**: Bearer token included

All systems are ready to go! 🎉
