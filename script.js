document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('plant-form');
    const plantsList = document.getElementById('plants');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('plant-name').value;
        const variety = document.getElementById('plant-variety').value;
        
        if (name && variety) {
            addPlant(name, variety);
            form.reset();
        }
    });

    function addPlant(name, variety) {
        const li = document.createElement('li');
        li.textContent = `${name} - ${variety}`;
        plantsList.appendChild(li);
    }
});
