 // Function to perform search based on input value
 function search() {
    var input = document.getElementById("searchInput").value.toLowerCase();
    searchCharacters(input);
}

// Function to perform search based on anime title
function searchByTitle(animeTitle) {
    searchCharacters(animeTitle.toLowerCase());
}

// Function to fetch and display search results
function searchCharacters(searchQuery) {
var resultsDiv = document.getElementById("results");
resultsDiv.innerHTML = ""; // Clear previous results

// Fetch the CSV data
fetch('anime_characters.csv')
.then(response => response.text())
.then(data => {
    var rows = data.split('\n'); // Split data into rows
    var found = false;

    rows.forEach(row => {
        var columns = row.split(','); // Split row into columns
        var anime = columns[0].trim().toLowerCase(); // Get anime name and convert to lowercase
        var character = columns[1].trim().toLowerCase(); // Get character name and convert to lowercase
        var imageLink = columns[2].trim();

        // Debugging: Log values
        console.log("Anime:", anime);
        console.log("Character:", character);
        console.log("Image Link:", imageLink);

        // Check if either anime or character name matches the search query
        if (anime.includes(searchQuery) || character.includes(searchQuery)) {
            resultsDiv.innerHTML += `
            <div>
                <img src="${imageLink}" alt="${character}" class="result-image"> <!-- Add class for styling -->
                <p class="character-name">${character}</p>
            </div>
            `;
            found = true;
        }
    });

    if (!found) {
        resultsDiv.innerHTML = "<p>No results found.</p>";
    }
})
.catch(error => console.error('Error fetching data:', error));
}
