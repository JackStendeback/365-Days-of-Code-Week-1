document.getElementById('generate-btn').addEventListener('click', generatePoem);
document.getElementById('save-btn').addEventListener('click', savePoem);

function generatePoem() {
    console.log('Generating poem...');
    // Fetch a random poem from the PoetryDB API
    fetch('https://poetrydb.org/random')
        .then(response => response.json())
        .then(data => {
            // Get the poem from the data
            const poem = data[0].lines.join('\n');

            // Display the poem in the poem display area
            document.getElementById('poem-display').textContent = poem;
        })
        .catch(error => {
            // Log any errors
            console.error('Error:', error);
        });
}

function savePoem() {
    // Get the current poem
    const poem = document.getElementById('poem-display').textContent;

    // Save the poem to localStorage
    localStorage.setItem('savedPoem', poem);
}
window.onload = function() {
    // Check localStorage for any saved poems
    const savedPoem = localStorage.getItem('savedPoem');

    // If there's a saved poem, display it in the saved poems area
    if (savedPoem) {
        document.getElementById('saved-poems').textContent = savedPoem;
    }
};