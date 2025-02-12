import express, { Router } from 'express';
import { search } from '../controllers/search.controller';

const router: Router = express.Router();

router.get('/', search);

export default router;
