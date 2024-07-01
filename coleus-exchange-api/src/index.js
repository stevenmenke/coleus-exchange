/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
	const url = new URL(request.url)
	const path = url.pathname
  
	if (request.method === 'GET' && path === '/api/plants') {
	  return getPlants()
	} else if (request.method === 'POST' && path === '/api/plants') {
	  return addPlant(request)
	}
  
	return new Response('Not Found', { status: 404 })
  }
  
  async function getPlants() {
	const plants = await COLEUS_PLANTS.get('plants', 'json') || []
	return new Response(JSON.stringify(plants), {
	  headers: { 'Content-Type': 'application/json' }
	})
  }
  
  async function addPlant(request) {
	const plant = await request.json()
	let plants = await COLEUS_PLANTS.get('plants', 'json') || []
	plants.push(plant)
	await COLEUS_PLANTS.put('plants', JSON.stringify(plants))
	return new Response(JSON.stringify(plant), {
	  headers: { 'Content-Type': 'application/json' }
	})
  }
  