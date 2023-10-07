document.getElementById("btn-fetch").addEventListener("click", () => {
    fetch("http://localhost:8080")
        .then(respuesta => respuesta.json())
        .then(dato => console.log(data))
})

document.getElementById('btn-submit').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el comportamiento predeterminado de enviar el formulario
 
    const nombreInput = document.querySelector('input[name="nombre"]');
    const nombreValor = nombreInput.value;
    console.log('Valor del campo de nombre:', nombreValor);
  
  });
  