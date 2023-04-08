import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const boardRouter = Router();

boardRouter.get('/home', (req, res) => LeaderboardController.getHomeBoard(req, res));

export default boardRouter;
