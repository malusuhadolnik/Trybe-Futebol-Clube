// Vamos por partes!!
// vamos precisar construir uma classe, e dentro delas os métodos do service

// os método para listar todas as categorias e listar por ID com o sequelize
// foram usados no BlogsAPI, dar uma olhadinha lá no código.

// lembrar de tipar a entrada e a saída
// qual é o tipo do model?? https://sequelize.org/docs/v6/other-topics/typescript/#requesting-a-model-class
// get all não tem entrada, mas tem saída: uma array de objetos representando dados de times
// e essa array também será uma promise, já que o método é assíncrono.

// A classe Model deve ser estática. Para instanciá-la, podemos usar tipá-la com o ModelStatic,
// fornecido pelo sequelize, ou utilizar static em seus métodos. Neste segundo caso, não há necessidade
// de usar um controller.

// Estratégia para resolução deste requisito foi debatida com Lígia Bicalho e Breno Lavalle, T25B.
// Dica da Lígia: NÃO usar arrow function, pois atrapalha o escopo da classe
// REF: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#cannot_be_used_as_methods

import { ModelStatic } from 'sequelize';
import Teams from '../models/Teams';

export default class TeamsService {
  model: ModelStatic<Teams> = Teams;

  async getAll():Promise<Teams[]> {
    const allTeams = await this.model.findAll();
    return allTeams;
  }
}
