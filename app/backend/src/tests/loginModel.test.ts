import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Model } from 'sequelize';
import Users from '../database/models/Users';

chai.use(chaiHttp);
const { expect } = chai;

// Desenvolvido de acordo com a mentoria estruturada de Testes de Integração

describe('Testes de integração para a rota login', () => {

  afterEach(sinon.restore)

  it('deve retornar status 400 caso o email não seja informado', async () => {
    const httpResponse = await chai
  .request(app)
      .post('/login')
      .send({
        password: 'secret_admin'
      })
      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
  })

  it('deve retornar status 400 caso a senha não seja informada', async () => {
      const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: '',
      })
      expect(httpResponse.status).to.equal(400)
      expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
    })

  it('deve retornar status 401 se a senha tiver menos de 6 caracteres', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'oie'
        })
      expect(httpResponse.status).to.equal(401)
      expect(httpResponse.body).to.deep.equal({ message: 'Invalid email or password' })
    })

  it('deve retornar status 401 se o email tiver formato inválido', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: "secret_admin",
          password: 'oie'
        })
      expect(httpResponse.status).to.equal(401)
      expect(httpResponse.body).to.deep.equal({ message: 'Invalid email or password' })
    })
    // it('deve retornar status 200 caso o login esteja correto', async () => {
    //   const user = {
    //     username: 'User',
    //     role: 'user',
    //     email: 'user@user.com',
    //     password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
    //   }
    //   sinon.stub(Model, 'findOne').resolves(user as Users);
  
    //   const httpResponse = await chai.request(app)
    //     .post('/login')
    //     .send({
    //       email: 'user@user.com',
    //       password: 'secret_user'
    //     })
    //   expect(httpResponse.status).to.be.equal(200);
    // })
  })