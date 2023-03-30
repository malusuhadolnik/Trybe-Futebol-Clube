import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Teams from '../database/models/Teams';
import TeamsService from '../database/services/teamsService';
import { mockOfAllTeams } from './mocks/mockOfAllTeams';
import { Response } from 'superagent';
import { resourceUsage } from 'process';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes de unidade do model de vendas', () => {
  it('Testa se ao acessar a rota /teams, é exibida uma lista com todos os times', async () => {
    // Arrange: configura o que é necessário para a execução do teste: mock!
    sinon.stub(TeamsService.prototype, 'getAll').resolves(mockOfAllTeams as Teams[]); // o "prototype" foi sugestão do vscode
    // Act: executa o teste
    const result = await chai.request(app).get('/teams');
    // Assert:verifica o resultado do teste
    expect(result).to.have.status(200);
    expect(result.body).to.deep.equal(mockOfAllTeams);
  })

  afterEach(function () {
    sinon.restore();
    });
});
