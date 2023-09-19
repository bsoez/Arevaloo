let objeto = {
    nombre:'belen',
    edad: '21',
    juegoFavorito:'R6'
}
let campos = Object.keys(objeto);
let valores = Object.values(objeto);
let llaves=Object.entries(objeto);

console.log(campos);
console.log(valores);
console.log(llaves)

let sentenciasql="";
let cadenaUpdate="update usuario";
let cadenaSet = "";
let cadenaWhere = "where"

campos.forEach(campo=>{
    console.log(campo+'='+objeto[campo]+'`');
    if(campo=='id'){
        
    }
    cadenaWhere(campo+'='+objeto[campo]+'`');
console.log(campo+'='+objeto[campo]+'`');
cadenaSet= cadenaSet+campo+'='+objeto[campo]+',';
});

