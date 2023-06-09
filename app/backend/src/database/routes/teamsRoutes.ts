import { Router } from 'express';
import TeamsController from '../controllers/teamsController';

const instanceOfController = new TeamsController();

const teamsRouter = Router();

// estamos trabalhando com classes, por isso o segundo argumento da rota precisa ser uma callback
teamsRouter.get('/', (req, res) => instanceOfController.getAllTeams(req, res));
teamsRouter.get('/:id', (req, res) => instanceOfController.getTeamById(req, res));

export default teamsRouter;
