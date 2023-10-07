document.getElementById('btn').addEventListener("click", () => {
    fetch("http://localhost:8080/alumnas")
        .then(respuesta => respuesta.json())
        .then(dato => console.log(dato))
});

document.getElementById('btnFetch').addEventListener("click", () => {
    fetch("http://localhost:8080/alumnos")
        .then(respuesta => respuesta.json())
        .then(dato => console.log(dato))
});