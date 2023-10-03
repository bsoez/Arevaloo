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

$('#agregar-btn').click(function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    // Obtener los valores del formulario
    var nombre = $('#nombre').val();
    var edad = $('#edad').val();
    var juegoFavorito = $('#juegoFavorito').val();

    // Validar si algún campo está vacío
    if (!nombre || !edad || !juegoFavorito) {
        Swal.fire({
            icon: 'error',
            title: 'Campos vacíos',
            text: 'Por favor, complete todos los campos.'
        });
        return; // Detener la ejecución si hay campos vacíos
    }

    if (edad < 1) {
        $('#edad').val('');
        Swal.fire({
            icon: 'error',
            title: 'Edad inválida',
            text: 'La edad debe ser mayor o igual a 1.'
        });
        return; // Detener la ejecución si la edad es inválida
    }

    // Construir los datos de formulario
    var formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('edad', edad);
    formData.append('juegoFavorito', juegoFavorito);

    // Realizar una solicitud POST para agregar el registro
    fetch('http://127.0.0.1:8080/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud.');
        }
        return response.json();
    })
    .then(response => {
        // Actualizar la tabla con el nuevo registro
        var nuevaFila = `<tr>
                            <td>${$('#tabla-usuarios tr').length + 1}</td>
                            <td>${nombre}</td>
                            <td>${edad}</td>
                            <td>${juegoFavorito}</td>
                        </tr>`;
        $('#tabla-usuarios').append(nuevaFila);

        // Limpiar los campos del formulario
        $('#nombre').val('');
        $('#edad').val('');
        $('#juegoFavorito').val('');

        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: response.mensaje,
            showConfirmButton: false,
            timer: 1000
        });
    })
    .catch(error => {
        console.error('Error al agregar el registro: ' + error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al agregar el registro.'
        });
    });
});
