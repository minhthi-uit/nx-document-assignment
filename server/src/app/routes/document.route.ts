import express, { Router } from 'express';
import {
  addDocument,
  deleteDocument,
  getDocument,
  updateDocument,
} from '../controllers/document.controller';

const router: Router = express.Router();

router.get('/:id', getDocument);
router.post('/', addDocument);
router.delete('/:id', deleteDocument);
router.patch('/:id', updateDocument);

export default router;
