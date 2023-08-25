window.onload = function() {
    const categoriasSelect = document.getElementById("categorias");
    const chisteImagen = document.getElementById("chisteImagen");

    // Función para cargar las categorías
    fetch('https://api.chucknorris.io/jokes/categories')
    .then(response => response.json())
    .then(data => {
        const categorias = data;
        
        categorias.forEach(element => {
            let opcion = document.createElement('option');
            opcion.value = element;
            opcion.text = element;
            categoriasSelect.appendChild(opcion);
        });
    })
    .catch(error => {
        console.error("Error fetching categories: ", error);
    });

    // Función para buscar chistes al hacer clic en el botón
    document.getElementById("ButtonBuscar").addEventListener("click", function() {
        const categoriaSeleccionada = categoriasSelect.value; // Obtenemos la categoría seleccionada
        fetch(`https://api.chucknorris.io/jokes/random?category=${categoriaSeleccionada}`)
            .then(response => response.json())
            .then(data => {
                chisteContainer.innerHTML = `<p>${data.value}</p>`;
                document.getElementById("chisteContainer").style.display = "block";
            })
            .catch(error => {
                console.error("Error fetching joke: ", error);
            });
    });
}
