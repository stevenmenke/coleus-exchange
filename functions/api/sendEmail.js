export async function sendEmail(plantName, plantVariety) {
    const API_KEY = process.env.BREVO_API_KEY;  // Replace with your actual Brevo API key
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': API_KEY,
        },
        body: JSON.stringify({
            sender: { email: 'mail@aatly.nl', name: 'Coleus Exchange' },
            to: [{ email: 'steven@menke.me', name: 'Test steven' }],
            subject: 'New Coleus Plant Added',
            htmlContent: `<html><body><h1>New Coleus Plant Added</h1><p>Name: ${plantName}</p><p>Variety: ${plantVariety}</p></body></html>`,
        }),
    });
    
    if (!response.ok) {
        throw new Error('Failed to send email');
    }

    return await response.json();
}
