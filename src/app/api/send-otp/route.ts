import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { phoneNumber, otp } = await request.json();

        // Format phone number: add 91 prefix (without +)
        const phoneWithCountryCode = `91${phoneNumber}`;

        const smsUrl = `https://api.savshka.co.in/api/sms?key=vxX4y4ui&to=${phoneWithCountryCode}&from=HLDCWD&body=Dear Traveler, Your secure OTP for Holidays Crowd account is ${otp} valid only for 5 minutes.&entityid=1001326296432787407&templateid=1007092667854703158`;

        const response = await fetch(smsUrl);
        const result = await response.json();

        console.log('SMS API Response:', result);

        if (response.ok && result.status !== 700) {
            return NextResponse.json({
                success: true,
                message: 'OTP sent successfully',
                data: result
            });
        } else {
            return NextResponse.json({
                success: false,
                message: result.description || 'Failed to send OTP'
            }, { status: 400 });
        }
    } catch (error) {
        console.error('Error sending OTP:', error);
        return NextResponse.json({
            success: false,
            message: 'Error sending OTP. Please try again.'
        }, { status: 500 });
    }
}
