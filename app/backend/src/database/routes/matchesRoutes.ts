import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const matchesController = new MatchesController();
const matchesRouter = Router();

matchesRouter.get('/', (req, res) => matchesController.getAllMatches(req, res));

export default matchesRouter;
