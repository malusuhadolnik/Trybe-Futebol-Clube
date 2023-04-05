import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Model } from 'sequelize';
import Users from '../database/models/Users';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2ODA2NDcxOTYsImV4cCI6MTY4MDczMzU5Nn0.7c4nXT7OMowA0RMDCKa6-ZC9d6rtlHa5MfMVMyBJwpA"

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
    it('deve retornar status 200 caso o login esteja correto', async () => {
      const user = {
        dataValues: {
        username: 'User',
        role: 'user',
        email: 'user@user.com',
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
        }
      }
      sinon.stub(Users, 'findOne').resolves(user as Users) ;
      // toda biblioteca usada precisa ser mockada!
      sinon.stub(bcryptjs, 'compareSync').resolves(true);
      sinon.stub(jwt, 'sign').resolves(token);
  
      const httpResponse = await chai.request(app)
        .post('/login')
        .send({
          email: 'user@user.com',
          password: 'secret_user'
        })
        // console.log(httpResponse.status); retorno validatecredentials undefined 401
        // console.log(httpResponse.body);  { message: 'Invalid email or password' }
      expect(httpResponse.status).to.be.equal(200); 
      // expect(httpResponse.body).to.have.key('token');
    })
  })