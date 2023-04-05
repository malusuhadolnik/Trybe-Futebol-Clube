import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import authenticateToken from '../middlewares/authToken';
import validateNewMatch from '../middlewares/validateNewMatch';

const matchesController = new MatchesController();
const matchesRouter = Router();

matchesRouter.get('/', (req, res) => matchesController.getAllMatches(req, res));
matchesRouter.patch(
  '/:id/finish',
  authenticateToken,
  (req, res) =>
    matchesController.setProgressToF(req, res),
);

matchesRouter.patch(
  '/:id',
  authenticateToken,
  (req, res) =>
    matchesController.updateScore(req, res),
);

matchesRouter.post(
  '/',
  authenticateToken,
  validateNewMatch,
  (req, res) =>
    matchesController.createnewMatch(req, res),
);

export default matchesRouter;
