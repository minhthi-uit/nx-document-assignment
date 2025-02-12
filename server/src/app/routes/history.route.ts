import express, { Router } from 'express';
import { addHistory, getHistory } from '../controllers/history.controller';

const router: Router = express.Router();

router.get('/', getHistory);
router.post('/', addHistory);

export default router;
