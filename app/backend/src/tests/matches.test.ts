import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Model } from 'sequelize';
import { mockMatches } from './mocks/mockMatches';
import { mockInProgress } from './mocks/mockInProgress';
import Matches from '../database/models/Matches'
import MatchesController from '../database/controllers/matchesController';
import MatchesService from '../database/services/matchesService';

chai.use(chaiHttp);
const { expect } = chai;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2ODA2NDcxOTYsImV4cCI6MTY4MDczMzU5Nn0.7c4nXT7OMowA0RMDCKa6-ZC9d6rtlHa5MfMVMyBJwpA';

describe('Testes de integração para a rota matches', () => {
  
  afterEach(sinon.restore);

  it('deve retornar a lista de todas as partidas em caso de sucesso', async () => {
      sinon.stub(Model, 'findAll').resolves(mockMatches as unknown as Matches[]);
  
      const httpResponse = await chai.request(app).get('/matches')
      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.deep.equal(mockMatches);
    })

  it('deve filtrar as partidas em andamento se inProgress = true', async () => {
    const inProgressIsTrue = [mockInProgress[1]];
    sinon.stub(Model, "findAll").resolves(inProgressIsTrue as unknown as Matches[]);
  
    const httpResponse = await chai.request(app).get('/matches?inProgress=true');
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.deep.equal(inProgressIsTrue);
    })

  
  it('deve filtrar as partidas finalizadas se inProgress = false', async () => {
    const inProgressIsFalse = [mockInProgress[1]];
    sinon.stub(Model, "findAll").resolves(inProgressIsFalse as unknown as Matches[]);
    
      const httpResponse = await chai.request(app).get('/matches?inProgress=false');
      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.deep.equal(inProgressIsFalse);
      })

  it(' /matches/:id/finish deve alterar o status de  partidas em andamento para false, se o token for válido', async () => {
    sinon.stub(Model, "update").resolves([1]);
    sinon.stub(jwt, 'verify').returns({ email: 'user@user.com'} as any);

    // https://github.com/chaijs/chai-http#setting-up-requests
    const httpResponse = await chai.request(app).patch('/matches/10/finish').set('authorization', token);
    console.log(httpResponse.body);

    expect(httpResponse.status).to.be.equal(200);
    })

  it('deve retornar um erro ao finalizar partidas, quando não há token na autenticação', async () => {
    sinon.stub(Model, "update").resolves();
    sinon.stub(bcryptjs, 'compareSync').resolves(true);
    sinon.stub(jwt, 'sign').resolves(token);
    
    const httpResponse = await chai.request(app).patch('/matches/10/finish').set('authorization', '');
    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.deep.equal({ message: 'Token not found' });
    })
  


  it('atualiza o placar e retorna uma mensagem de sucesso, com status 200, se o token é válido', async () => {
    sinon.stub(Model, "update").resolves([1]);

    sinon.stub(jwt, 'verify').returns({ email: 'user@user.com'} as any);
    // fazer stub do verify
    // não é bom fazer const do token pra usar no teste, pq ele expira

    const newScore = {
      homeTeamGoals: 7,
      awayTeamGoals: 1
    };
  
    const httpResponse = await chai.request(app).patch('/matches/1').send(newScore).set('authorization', token);
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.deep.equal({ message: 'Update succeeded' });
    })


  
    it('não atualiza o placar e retorna uma mensagem de erro, status 401, se o token não é encontrado', async () => {
      sinon.stub(Model, "update").resolves();
      sinon.stub(bcryptjs, 'compareSync').resolves(true);
      sinon.stub(jwt, 'sign').resolves(token);
  
      const newScore = {
        homeTeamGoals: 7,
        awayTeamGoals: 1
      };
      
      const httpResponse = await chai.request(app).patch('/matches/1').send(newScore).set('authorization', '');
      expect(httpResponse.status).to.be.equal(401);
      expect(httpResponse.body).to.deep.equal({ message: 'Token not found' });
      })
});