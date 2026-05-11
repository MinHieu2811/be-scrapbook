import { Router } from 'express';
import {
  createGift,
  getGiftById,
  getAllGifts,
} from '../controllers/gift.controller';
import { cacheMiddleware } from '../middlewares/cache';

const router = Router();

router.get('/', cacheMiddleware(60, 300), getAllGifts);
router.get('/:id', cacheMiddleware(60, 300), getGiftById);
router.post('/', createGift);

export default router;
