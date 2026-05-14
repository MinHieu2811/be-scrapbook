import { Router } from 'express';
import { createGift, getGiftById, getAllGifts } from '../controllers/gift.controller';

const router = Router();

router.get('/', getAllGifts);
router.get('/:id', getGiftById);
router.post('/', createGift);

export default router;
