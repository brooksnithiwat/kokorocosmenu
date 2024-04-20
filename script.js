
document.addEventListener("DOMContentLoaded", function() {
    var h3 = document.querySelector('.hero-text h3');
    var h1 = document.querySelector('.hero-text h1');
    var h4 = document.querySelector('.hero-text h4');
    
    h3.classList.add('show');
    h1.classList.add('show');
    h4.classList.add('show');
});
const header = document.querySelector("header");
window.addEventListener("scroll",function(){
    header.classList.toggle("Sticky",window.scrollY>200)
});


// JavaScript code to handle smooth scrolling
// Select all anchor tags with href starting with #
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Add click event listener to each anchor tag
    anchor.addEventListener('click', function (e) {
        // Prevent default link behavior
        e.preventDefault();

        // Get the target section's ID from the href attribute
        const target = document.querySelector(this.getAttribute('href'));

        // Scroll to the target section smoothly
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});
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

// Event listener for the button
document.getElementById("searchButton").addEventListener("click", function() {
    // Call the searchCharacters function with the search query from the input field
    var searchQuery = document.getElementById("searchInput").value.toLowerCase();
    searchCharacters(searchQuery);

    // Change background color to green
    // document.firstElementChild.style.backgroundImage = "url('flag.png')";

});

