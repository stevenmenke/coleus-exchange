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
	const headers = {
	  "Access-Control-Allow-Origin": "https://coleus-exchange.pages.dev",
	  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
	  "Access-Control-Allow-Headers": "Content-Type",
	}
  
	// Log the request details
	console.log('Request method:', request.method)
	console.log('Request URL:', request.url)
  
	if (request.method === "OPTIONS") {
	  return new Response(null, { headers })
	}
  
	const url = new URL(request.url)
	const path = url.pathname
  
	console.log('Requested path:', path)
  
	if (path === '/' || path === '') {
	  return new Response('Welcome to Coleus Exchange API', { headers })
	} else if (request.method === 'GET' && path === '/api/plants') {
	  return getPlants(headers)
	} else if (request.method === 'POST' && path === '/api/plants') {
	  return addPlant(request, headers)
	}
  
	return new Response('Not Found', { status: 404, headers })
  }
  
  async function getPlants(headers) {
	const plants = await COLEUS_PLANTS.get('plants', 'json') || []
	return new Response(JSON.stringify(plants), {
	  headers: { ...headers, "Content-Type": "application/json" }
	})
  }
  
  async function addPlant(request, headers) {
	try {
	  const plant = await request.json()
	  let plants = await COLEUS_PLANTS.get('plants', 'json') || []
	  plants.push(plant)
	  await COLEUS_PLANTS.put('plants', JSON.stringify(plants))
	  return new Response(JSON.stringify(plant), {
		headers: { ...headers, "Content-Type": "application/json" }
	  })
	} catch (error) {
	  console.error('Error in addPlant:', error)
	  return new Response(JSON.stringify({ error: 'Failed to add plant' }), {
		status: 500,
		headers: { ...headers, "Content-Type": "application/json" }
	  })
	}
  }
  
  