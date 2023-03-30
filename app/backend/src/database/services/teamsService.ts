// Vamos por partes!!
// vamos precisar construir uma classe, e dentro delas os métodos do service
// além disso, vamos precisar de um constructor, que deve retornar a dependência dessa classe. Fonte: chat gpt
// e no caso a dependência do service é a model

// os método para listar todas as categorias e listar por ID com o sequelize
// foram usados no BlogsAPI, dar uma olhadinha lá no código.
// https://blog.logrocket.com/async-await-in-typescript/

// lembrar de tipar a entrada e a saída
// qual é o tipo do model?? https://sequelize.org/docs/v6/other-topics/typescript/#requesting-a-model-class
// get all não tem entrada, mas tem saída: uma array de objetos representando dados de times
// e essa array também será uma promise, já que o método é assíncrono.
import { ModelStatic } from 'sequelize';
import Teams from '../models/Teams';

export default class TeamsService {
  public _model: ModelStatic<Teams>; // a função do ModelStatic é avisar que o modelo em questão é estático

  constructor(model: ModelStatic<Teams>) {
    this._model = model;
  }

  public getAll = async (): Promise<Teams[]> => {
    const allTeams = await this._model.findAll();
    return allTeams;
  };
}
