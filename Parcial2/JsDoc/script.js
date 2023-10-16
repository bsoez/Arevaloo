  /**
         * Suma dos números.
         *
         * Esta función toma dos números y devuelve su suma.
         *
         * @param {number} a - El primer número.
         * @param {number} b - El segundo número.
         * @returns {number} La suma de a y b.
         */
  function sumar(a, b) {
    return a + b;
}

function sumarNumeros() {
    const numero1 = parseFloat(document.getElementById('numero1').value);
    const numero2 = parseFloat(document.getElementById('numero2').value);
    const resultado = sumar(numero1, numero2);
    document.getElementById('resultado').textContent = resultado;
}