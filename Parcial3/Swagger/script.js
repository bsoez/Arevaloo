$(document).ready(function() {
    // Hacer una solicitud Ajax para obtener los datos
    $.ajax({
        url: 'http://127.0.0.1:8080/usuarios',
        dataType: 'json',
        success: function(data) {
            // Iterar a través de los datos y agregar filas a la tabla
            $.each(data, function(index, usuario) {
                var fila = `<tr>
                                <td>${index + 1}</td>
                                <td>${usuario.Nombre}</td>
                                <td>${usuario.Edad}</td>
                                <td>${usuario.JuegoFavorito}</td>
                            </tr>`;
                $('#tabla-usuarios').append(fila);
            });
        },
        error: function(error) {
            console.error('Error al cargar los datos: ' + error);
        }
    });
});