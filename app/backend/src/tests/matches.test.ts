import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Model } from 'sequelize';
import { mockMatches } from './mocks/mockMatches';
import IMatch from '../database/interfaces/IMatch';
import Matches from '../database/models/Matches'

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes de integração para a rota matches', () => {
  
  afterEach(sinon.restore);

  it('deve retornar a lista de todas as partidas em caso de sucesso', async () => {
      // sinon.stub(Model, 'findAll').resolves(mockMatches as IMatch);
  
      const httpResponse = await chai.request(app).get('/matches')
      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.deep.equal(mockMatches);
    })
});