import { Router } from 'express';
import {
  getAllScrapbooks,
  getScrapbookById,
  createScrapbook,
  updateScrapbook,
  deleteScrapbook,
} from '../controllers/scrapbook.controller';
import { cacheMiddleware } from '../middlewares/cache';

const router = Router();

router.get('/', cacheMiddleware(60, 300), getAllScrapbooks);
router.get('/:id', cacheMiddleware(60, 300), getScrapbookById);
router.post('/', createScrapbook);
router.put('/:id', updateScrapbook);
router.delete('/:id', deleteScrapbook);

export default router;
