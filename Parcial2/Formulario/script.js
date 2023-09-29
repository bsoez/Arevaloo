$(document).ready(function() {
    // Hacer una solicitud GET para cargar los datos iniciales de la tabla
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

    $('#agregar-btn').click(function(event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del formulario
    
        // Obtener los valores del formulario
        var nombre = $('#nombre').val();
        var edad = $('#edad').val();
        var juegoFavorito = $('#juegoFavorito').val();
    
        // Validar si algún campo está vacío
        if (!nombre || !edad || !juegoFavorito) {
            alert('Por favor, complete todos los campos.');
            return; // Detener la ejecución si hay campos vacíos
        }
    
        // Construir la URL con los parámetros de consulta
        var url = `http://127.0.0.1:8080/usuarios?nombre=${nombre}&edad=${edad}&juegoFavorito=${juegoFavorito}`;
    
        // Realizar una solicitud POST para agregar el registro
        $.ajax({
            url: url,
            method: 'POST',
            success: function(response) {
                // Actualizar la tabla con el nuevo registro
                var nuevaFila = `<tr>
                                    <td>${$('#tabla-usuarios tr').length}</td>
                                    <td>${nombre}</td>
                                    <td>${edad}</td>
                                    <td>${juegoFavorito}</td>
                                </tr>`;
                $('#tabla-usuarios').append(nuevaFila);
    
                // Limpiar los campos del formulario
                $('#nombre').val('');
                $('#edad').val('');
                $('#juegoFavorito').val();
    
                alert(response.mensaje);
                // Mostrar un mensaje de éxito
            },
            error: function(error) {
                console.error('Error al agregar el registro: ' + error);
                alert('Error al agregar el registro.');
            }
        });
    });    
    
});
