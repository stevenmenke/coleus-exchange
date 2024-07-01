export async function onRequestGet(context) {
    const plants = await context.env.COLEUS_PLANTS.get('plants', 'json') || [];
    return new Response(JSON.stringify(plants), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  export async function onRequestPost(context) {
    const plant = await context.request.json();
    let plants = await context.env.COLEUS_PLANTS.get('plants', 'json') || [];
    plants.push(plant);
    await context.env.COLEUS_PLANTS.put('plants', JSON.stringify(plants));
    return new Response(JSON.stringify(plant), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  