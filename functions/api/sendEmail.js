export async function sendEmail(plantName, plantVariety) {
    console.log('Attempting to send email for plant:', plantName, plantVariety);
    const API_KEY = BREVO_API_KEY;
    console.log('API Key (first few characters):', API_KEY ? API_KEY.substring(0, 5) + '...' : 'Not found');

    if (!API_KEY) {
        throw new Error('BREVO_API_KEY not found in environment variables');
    }

    try {
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY,
            },
            body: JSON.stringify({
                sender: { email: 'mail@aatly.nl', name: 'Coleus Exchange' },
                to: [{ email: 'stevenmenke@gmail.com', name: 'Test steven' }],
                subject: 'New Coleus Plant Added',
                htmlContent: `<html><body><h1>New Coleus Plant Added</h1><p>Name: ${plantName}</p><p>Variety: ${plantVariety}</p></body></html>`,
            }),
        });
        
        console.log('Response status:', response.status);
        const responseBody = await response.text();
        console.log('Response body:', responseBody);

        if (!response.ok) {
            throw new Error(`Failed to send email: ${response.status} ${responseBody}`);
        }

        return JSON.parse(responseBody);
    } catch (error) {
        console.error('Error in sendEmail:', error);
        throw error;
    }
}
