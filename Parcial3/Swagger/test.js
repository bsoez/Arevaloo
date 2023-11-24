const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');

const app = require('./app'); 

describe('Pruebas de integración para la ruta de usuario', () => {
  it('Debería obtener datos de la base de datos al hacer una solicitud GET', (done) => {
    supertest(app)
      .get('/usuarios') 
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
        done();
      });
  });
});