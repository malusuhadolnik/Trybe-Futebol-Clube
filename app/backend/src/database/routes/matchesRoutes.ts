import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import authenticateToken from '../middlewares/authToken';

const matchesController = new MatchesController();
const matchesRouter = Router();

matchesRouter.get('/', (req, res) => matchesController.getAllMatches(req, res));
matchesRouter.patch(
  '/:id/finish',
  authenticateToken,
  (req, res) =>
    matchesController.setProgressToF(req, res),
);

export default matchesRouter;
