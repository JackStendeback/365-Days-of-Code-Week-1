document.getElementById('generate-btn').addEventListener('click', generatePoem);
document.getElementById('save-btn').addEventListener('click', savePoem);

function generatePoem() {
    fetch('https://poetrydb.org/random')
        .then(response => response.json())
        .then(data => {
            const poem = data[0].lines.join('\n');
            const title = data[0].title;
            const author = data[0].author;

            document.getElementById('poem-text').textContent = poem;
            document.getElementById('poem-title').textContent = title;
            document.getElementById('poem-author').textContent = author;
        })
        .catch(error => {
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