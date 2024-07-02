const API_URL = '/api/plants';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('plant-form');
    const plantsList = document.getElementById('plants');

    loadPlants();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('plant-name').value;
        const variety = document.getElementById('plant-variety').value;
        if (name && variety) {
            await addPlant(name, variety);
            form.reset();
            loadPlants();
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
            plantsList.innerHTML = '<li>Error loading plants. Please try again later.</li>';
        }
    }

    function displayPlants(plants) {
        plantsList.innerHTML = plants.length === 0 
            ? '<li>No plants added yet.</li>' 
            : plants.map(plant => `<li>${plant.name} - ${plant.variety}</li>`).join('');
    }

    async function addPlant(name, variety) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, variety }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            alert('Failed to add plant. Please try again.');
        }
    }
});
