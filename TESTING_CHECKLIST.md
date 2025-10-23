# Testing Checklist ✅

## ✅ Changes Applied
- ✅ All icons now use `strokeWidth: 1` for consistent thin line styling
- ✅ No compilation errors
- ✅ Dev server running successfully on http://localhost:3001

## 🧪 Testing Guide

### Test 1: Popup Opening
- [ ] Click "Explore Bali" button on hero section → Popup should open
- [ ] Click "Plan Your Custom Trip →" button in footer → Popup should open
- [ ] Click outside popup (backdrop) → Popup should close
- [ ] Click X button → Popup should close

### Test 2: Step 1 - Destination & Preferences
- [ ] Verify MapPin icon has thin stroke (1px)
- [ ] Type in destination field → Should accept input
- [ ] Click trip type cards (Honeymoon, Family, Friends, Solo) → Should highlight selected
- [ ] Verify all trip type icons have thin strokes
- [ ] Click trip theme cards (Mountains, Beaches, Pilgrimage, Nature) → Should highlight selected
- [ ] Verify all trip theme icons have thin strokes
- [ ] Click "Next →" button → Should move to Step 2

### Test 3: Step 2 - Travel Details
- [ ] Verify Users icon has thin stroke
- [ ] Select number of travelers dropdown → Should show options
- [ ] Verify Calendar icon has thin stroke
- [ ] Select travel date → Should accept date
- [ ] Click +/- buttons for trip duration → Should increment/decrement days
- [ ] Check "Flexible with dates" checkbox → Should toggle
- [ ] Verify Hotel icons have thin strokes
- [ ] Click hotel category (2-5 stars) → Should highlight selected
- [ ] Click "← Back" button → Should go back to Step 1
- [ ] Click "Next →" button → Should move to Step 3

### Test 4: Step 3 - Contact & OTP
- [ ] Verify MapPin icon has thin stroke
- [ ] Enter location → Should accept input
- [ ] Enter full name → Should accept input
- [ ] Check WhatsApp updates checkbox → Should toggle
- [ ] Verify Phone icon has thin stroke
- [ ] Enter 10-digit phone number → Should accept only numbers
- [ ] Verify Mail icon has thin stroke
- [ ] Enter email address → Should validate email format
- [ ] Click "Send OTP" button → Should send OTP

### Test 5: OTP Verification
- [ ] After sending OTP, form fields should be disabled
- [ ] Success message should appear: "OTP sent successfully!"
- [ ] OTP input field should appear
- [ ] Enter 6-digit OTP → Should accept only numbers (max 6 digits)
- [ ] Click "Resend OTP" link → Should reset OTP flow
- [ ] Enter correct OTP and click "Submit ✓" → Should submit to CRM
- [ ] Success message should appear: "🎉 Success! We will contact you soon."
- [ ] Popup should auto-close after 2 seconds

### Test 6: Mobile Responsiveness
- [ ] Open on mobile device (or use browser dev tools)
- [ ] Progress bar should show at top instead of left panel
- [ ] All buttons should be touch-friendly
- [ ] Form should be scrollable
- [ ] Popup should fit within viewport

### Test 7: Error Handling
- [ ] Try submitting without filling required fields → Should show validation errors
- [ ] Enter invalid phone number → Should show validation
- [ ] Enter invalid email → Should show validation
- [ ] Enter wrong OTP → Should show "Invalid OTP" error message

### Test 8: Visual Consistency
- [ ] All icons should have thin 1px strokes (consistent styling)
- [ ] Colors should match landing page theme (dark primary/secondary)
- [ ] Fonts should be light weight (font-light)
- [ ] Rounded corners should be consistent (rounded-2xl, rounded-3xl)
- [ ] Transitions should be smooth (duration-300)
- [ ] Hover states should work on all interactive elements

### Test 9: CRM Integration
- [ ] Open browser console (F12)
- [ ] Complete the form and submit
- [ ] Check console for "CRM Response:" log
- [ ] Verify all form data is sent correctly:
  - name, phone_number (+91 prefix), email
  - start_date, no_of_days
  - no_of_adults, no_of_children, no_of_infant
  - destination, Hotelcategory
  - flexibleDate (Yes/No), whatsapp (Yes/No)
  - Triptheme, Guest'slocation
  - client_request_uid (HC-timestamp format)

### Test 10: Footer Form (Original)
- [ ] Scroll to footer section
- [ ] Verify original "Send OTP" form still works
- [ ] Submit form with OTP verification
- [ ] Verify data is sent to CRM
- [ ] Verify "Plan Your Custom Trip →" button opens the new popup

## 🎨 Icon Stroke Verification
All these icons should have **strokeWidth: 1px**:
- ✅ X (Close button)
- ✅ MapPin (Destination, Location)
- ✅ Heart, Users, UserCircle, User (Trip types)
- ✅ Mountain, Waves, Church, Leaf (Trip themes)
- ✅ Users (Travelers count)
- ✅ Calendar (Travel date)
- ✅ Hotel (Hotel categories)
- ✅ Phone (Phone number)
- ✅ Mail (Email)

## 🚀 Quick Test URL
http://localhost:3001

## 📊 Test Results
Date: ___________
Tested by: ___________

All tests passed: [ ] Yes  [ ] No

Issues found:
_________________________________
_________________________________
_________________________________
