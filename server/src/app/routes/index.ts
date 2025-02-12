import { Router } from 'express';
import documentRoute from './document.route';
import folderRoute from './folder.route';
import historyRoute from './history.route';
import searchRoute from './search.route';

const router: Router = Router();

router.use('/folders', folderRoute);
router.use('/documents', documentRoute);
router.use('/history', historyRoute);
router.use('/search', searchRoute);

export default router;
