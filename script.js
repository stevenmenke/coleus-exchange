// Define the API URL as a constant
const API_URL = 'https://coleus-exchange-api.stevenmenke.workers.dev/api/plants';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('plant-form');
    const plantsList = document.getElementById('plants');

    // Load plants when the page loads
    loadPlants();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('plant-name').value;
        const variety = document.getElementById('plant-variety').value;
        
        if (name && variety) {
            await addPlant(name, variety);
            form.reset();
            loadPlants();  // Reload the list after adding
        }
    });

    async function loadPlants() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const plants = await response.json();
            displayPlants(plants);
        } catch (error) {
            console.error('Error loading plants:', error);
            plantsList.innerHTML = '<li>Error loading plants. Please try again later.</li>';
        }
    }

    function displayPlants(plants) {
        plantsList.innerHTML = '';
        if (plants.length === 0) {
            plantsList.innerHTML = '<li>No plants added yet.</li>';
        } else {
            plants.forEach(plant => {
                const li = document.createElement('li');
                li.textContent = `${plant.name} - ${plant.variety}`;
                plantsList.appendChild(li);
            });
        }
    }

    async function addPlant(name, variety) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, variety }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log('Plant added:', result);
        } catch (error) {
            console.error('Error adding plant:', error);
            alert('Failed to add plant. Please try again.');
        }
    }
});
