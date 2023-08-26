
function XML() {
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            
            const responseJSON = JSON.parse(this.responseText);
            const nombre = responseJSON.nombre;
            const mensaje = responseJSON.mensaje;
            showDialog("XML",nombre,mensaje);
          
        }
    });

    xhr.open("GET", "https://apimocha.com/belenapio/twitch");
    xhr.setRequestHeader("Accept", "*/*");

    xhr.send(data);
}

async function FetchAsync() {
    let headersList = {
        "Accept": "*/*",
    }
    
    let response = await fetch("https://apimocha.com/belenapio/twitch", { 
        method: "GET",
        headers: headersList
    });
    
    let data = await response.json(); // Parsear la respuesta como JSON

    // Obtener las propiedades "nombre" y "mensaje" del objeto JSON
    const nombre = data.nombre;
    const mensaje = data.mensaje;

    showDialog("Fetch Async",nombre,mensaje);
}



function FetchPromesa() {
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
       };
       
       fetch("https://apimocha.com/belenapio/twitch", { 
         method: "GET",
         headers: headersList
       })
         .then(response => {
           if (!response.ok) {
             throw new Error(`HTTP error! Status: ${response.status}`);
           }
           return response.text();
         })
         .then(data => {
            const responseJSON = JSON.parse(data);
            const nombre = responseJSON.nombre;
            const mensaje = responseJSON.mensaje;
            showDialog("Fetch promesa",nombre,mensaje);
            console.log(data);
         })
         .catch(error => {
           console.error('Error:', error);
         });       
}



$(document).ready(function(){
    $('#btnJQuery').click(function(){
        realizarPeticionJQuery();
    });
});

function realizarPeticionJQuery() {
    const url = "https://apimocha.com/belenapio/twitch";

    $.get(url, function(response) {
    })
    .done(function(response) {
        const nombre = response.nombre;
        const mensaje = response.mensaje;
        showDialog("JQuery",nombre,mensaje);
        console.log(response);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error en la petición:", textStatus, errorThrown);
    });
}

async function AxiosRequest() {
    let headersList = {
        "Accept": "*/*"
    }

    let reqOptions = {
        url: "https://apimocha.com/belenapio/twitch",
        method: "GET",
        headers: headersList,
    }

    try {
        let response = await axios.request(reqOptions);
            const nombre = response.data.nombre;
            const mensaje = response.data.mensaje;
            showDialog("Axios",nombre,mensaje);

        console.log(response.data);
    } catch (error) {
        console.error("Error:", error);
    }
}

function showDialog(title,nombre,mensaje) {
    const dialog = document.getElementById("customDialog");
    const dialogText = document.getElementById("dialogText");
    const dialogTitle = dialog.querySelector("h2"); 


    dialogText.textContent = `Nombre: ${nombre} \nMensaje: ${mensaje}`;
    dialog.style.display = "block";
    dialogTitle.textContent = title; 
}

function hideDialog() {
    const dialog = document.getElementById("customDialog");

    dialog.style.animation = "fadeOut 0.3s ease";
    setTimeout(() => {
        dialog.style.display = "none";
        dialog.style.animation = "";
    }, 300);
}


