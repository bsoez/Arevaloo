// test.js
const chai = require('chai');
const math = require('./math'); // Ruta al archivo math.js

const expect = chai.expect;

describe('Math Functions', () => {
  it('debería sumar 2 números', () => {
    expect(math.add(2, 3)).to.equal(5);
  });

  it('debería restar 2 números', () => {
    expect(math.subtract(5, 3)).to.equal(2);
  });

  it('debería multiplicar 2 números', () => {
    expect(math.multiply(2, 3)).to.equal(6);
  });

  it('debería dividir 2 números', () => {
    expect(math.divide(6, 2)).to.equal(3);
  });

  it('debería dividirse entre 0', () => {
    expect(math.divide(6, 0)).to.equal('no debería dividirse entre 0');
  });
});