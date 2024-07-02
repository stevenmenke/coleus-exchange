export async function sendEmail(context, plantName, plantVariety) {
    const API_KEY = context.env.BREVO_API_KEY;

    if (!API_KEY) {
        throw new Error('Email service configuration error');
    }

    try {
        const response = await fetch('https://api.sendinblue.com/v3/smtp/email', {
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

        if (!response.ok) {
            throw new Error('Failed to send email');
        }

        return await response.json();
    } catch (error) {
        throw new Error('Email sending failed');
    }
}
