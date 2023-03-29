// Vamos por partes!!
// vamos precisar construir uma classe, e dentro delas os métodos do service
// além disso, vamos precisar de um constructor, que deve retornar a dependência dessa classe. Fonte: chat gpt
// e no caso a dependência do service é a model

// os método para listar todas as categorias e listar por ID com o sequelize 
// foram usados no BlogsAPI, dar uma olhadinha lá no código. 
// https://blog.logrocket.com/async-await-in-typescript/

//lembrar de tipar a entrada e a saída 
// qual é o tipo do model?? https://sequelize.org/docs/v6/other-topics/typescript/#requesting-a-model-class
// get all não tem entrada, mas tem saída: uma array de objetos representando dados de times
// e essa array também será uma promise, já que o método é assíncrono.

import Teams from "../models/Teams"
import { ModelStatic } from 'sequelize'

export default class TeamsService {
  public _model: ModelStatic<any>

  constructor(model: ModelStatic<any>) {
    this._model = model
  }

  public getAll = async (): Promise<Teams[]> => {
    const allTeams = await this._model.findAll();
    return allTeams;
  }
}