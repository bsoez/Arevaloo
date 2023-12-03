const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest');
const expect = chai.expect;
chai.use(chaiHttp);
const app = require('./app');

/*Testeo de GET y POST con Chai-Http*/
describe('Pruebas de integración para la ruta de usuario con Chai-Http', () => {
it('Debería obtener datos de la base de datos al hacer una solicitud GET', (done) => {
  chai
  .request(app)
  .get('/usuarios')
  .end((err, res) => {
      if (err) return done(err);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
      done();
    });
  });
});
  
describe('Pruebas de integración para la ruta de usuario con Chai-Http', () => {
  it('Debería agregar un nuevo usuario a la base de datos al hacer una solicitud POST', (done) => {
    const nuevoUsuario = {
      nombre: 'BelénCamarón',
      edad: 21,
      juegoFavorito: 'Robloz'
    };

    chai
      .request(app)
      .post('/usuarios')
      .query(nuevoUsuario)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('mensaje').that.equals('Información agregada correctamente');
        done();
      });
  });
});

/*Testeo de GET con Jest-Supertest*/
describe('Pruebas de integración para la ruta de usuario con Jest-Supertest', () => {
    it('Debería obtener datos de la base de datos al hacer una solicitud GET', async () => {
      const response = await request(app).get('/usuarios');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
    });
});