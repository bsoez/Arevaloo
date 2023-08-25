

function XML() {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        console.log(this.responseText);
    }
    });

    xhr.open("GET", "https://apimocha.com/belenapi/twitch");
    xhr.setRequestHeader("Accept", "*/*");

    xhr.send(data);
}

async function FetchAsync() {
    let headersList = {
        "Accept": "*/*",
       }
       
       let response = await fetch("https://apimocha.com/belenapi/twitch", { 
         method: "GET",
         headers: headersList
       });
       
       let data = await response.text();
       console.log(data);  
}

function FetchPromesa() {
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
       };
       
       fetch("https://apimocha.com/belenapi/twitch", { 
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
    const url = "https://apimocha.com/belenapi/twitch";

    $.get(url, function(response) {
    })
    .done(function(response) {
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
        url: "https://apimocha.com/belenapi/twitch",
        method: "GET",
        headers: headersList,
    }

    try {
        let response = await axios.request(reqOptions);
        console.log(response.data);
    } catch (error) {
        console.error("Error:", error);
    }
}



