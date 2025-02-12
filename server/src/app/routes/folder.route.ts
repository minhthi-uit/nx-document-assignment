import express, { Router } from 'express';
import {
  addFolder,
  deleteFolder,
  getDocumentsByFolder,
  getFolders,
} from '../controllers/folder.controller';

const router: Router = express.Router();

router.get('/', getFolders);
router.get('/:id', getDocumentsByFolder);
router.post('/', addFolder);
router.delete('/:id', deleteFolder);

export default router;
