import { sendEmail } from './sendEmail.js';

export async function onRequestGet(context) {
  const plants = await context.env.COLEUS_PLANTS.get('plants', 'json') || [];
  return new Response(JSON.stringify(plants), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function onRequestPost(context) {
  try {
    const plant = await context.request.json();
    let plants = await context.env.COLEUS_PLANTS.get('plants', 'json') || [];
    plants.push(plant);
    await context.env.COLEUS_PLANTS.put('plants', JSON.stringify(plants));

    try {
      await sendEmail(context, plant.name, plant.variety);
    } catch (emailError) {
      // Silently handle email errors in production
    }

    return new Response(JSON.stringify({ plant, message: 'Plant added successfully' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'An error occurred while processing your request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
