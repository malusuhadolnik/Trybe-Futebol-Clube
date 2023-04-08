import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const boardRouter = Router();

boardRouter.get('/home', (req, res) => LeaderboardController.getHomeBoard(req, res));
boardRouter.get('/away', (req, res) => LeaderboardController.getAwayBoard(req, res));

export default boardRouter;
