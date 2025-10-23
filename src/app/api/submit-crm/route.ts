import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.json();

        const requestId = `HC-${Date.now()}`;

        // Build the URL with query parameters
        const params = new URLSearchParams({
            name: formData.fullName,
            phone_number: `+91${formData.phoneNumber}`,
            email: formData.emailAddress,
            start_date: formData.tripDate,
            no_of_days: formData.days,
            no_of_adults: formData.adults,
            no_of_children: formData.children,
            no_of_infant: formData.infants,
            destination: formData.destination,
            Hotelcategory: formData.hotelCategory,
            'flexibleDate?': formData.flexibleDate ? 'Yes' : 'No',
            'whatsapp?': formData.whatsappUpdates ? 'Yes' : 'No',
            Triptheme: formData.tripTheme,
            "Guest'slocation": formData.location,
            client_request_uid: requestId,
        });

        const sembarkUrl = `https://api.sembark.com/integrations/v1/trip-plan-requests?${params.toString()}`;

        const response = await fetch(sembarkUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer 540|322bbLy0a6LYOEARcsM8z8mSCQ53qq6oZwcZCuUZ72b9651f',
            },
        });

        const result = await response.json();
        console.log('CRM Response:', result);

        if (response.ok) {
            return NextResponse.json({
                success: true,
                message: 'Trip request submitted successfully',
                data: result,
            });
        } else {
            return NextResponse.json({
                success: false,
                message: 'Failed to submit trip request',
                error: result,
            }, { status: response.status });
        }
    } catch (error) {
        console.error('Error submitting to CRM:', error);
        return NextResponse.json({
            success: false,
            message: 'Error submitting form. Please try again.',
        }, { status: 500 });
    }
}
