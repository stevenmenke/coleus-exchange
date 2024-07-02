import { sendEmail } from './sendEmail.js';

console.log = console.log.bind(console);


export async function onRequestGet(context) {
  const plants = await context.env.COLEUS_PLANTS.get('plants', 'json') || [];
  return new Response(JSON.stringify(plants), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function onRequestPost(context) {
  try {
    const plant = await context.request.json();
    console.log('Received plant data:', plant);

    let plants = await context.env.COLEUS_PLANTS.get('plants', 'json') || [];
    plants.push(plant);
    await context.env.COLEUS_PLANTS.put('plants', JSON.stringify(plants));

    console.log('Attempting to send email...');
    try {
      await sendEmail(context, plant.name, plant.variety);
      console.log('Email sent successfully');
    } catch (emailError) {
      console.error('Error sending email:', emailError);
    }    

    return new Response(JSON.stringify({ plant, message: 'Plant added and email sent' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error in onRequestPost:', error);
    return new Response(JSON.stringify({ error: error.message, stack: error.stack }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
