import { Router } from 'express';
import TeamsController from '../controllers/teamsController';

const teamsRouter = Router();

// estamos trabalhando com classes, por isso o segundo argumento da rota precisa ser uma callback
teamsRouter.get('/', (req, res) => TeamsController.getAllTeams(req, res));

export default teamsRouter;
