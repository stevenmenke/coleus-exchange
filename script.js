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
        const response = await fetch('https://coleus-exchange-api.stevenmenke.workers.dev');
        const plants = await response.json();
        plantsList.innerHTML = '';
        plants.forEach(plant => {
            const li = document.createElement('li');
            li.textContent = `${plant.name} - ${plant.variety}`;
            plantsList.appendChild(li);
        });
    }

    async function addPlant(name, variety) {
        await fetch('https://coleus-exchange-api.stevenmenke.workers.dev', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, variety }),
        });
    }
});
