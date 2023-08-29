window.onload = function() { // Use window.onload to ensure the DOM is fully loaded before running the script.
    document.getElementById("fetchButton").addEventListener("click", function() {
        fetch('https://api.chucknorris.io/jokes/categories')
            .then(response => response.json())
            .then(data => {
                const selectElement = document.getElementById("categorias");
                selectElement.innerHTML = ''; // Clear any previous options
                data.forEach(category => {
                    const option = document.createElement("option");
                    option.text = category;
                    selectElement.add(option);
                });
            })
            .catch(error => {
                console.error("Error fetching categories: ", error);
            });
    });
}