import { Router } from 'express';
import {
  getAllScrapbooks,
  getScrapbookById,
  createScrapbook,
  updateScrapbook,
  deleteScrapbook,
} from '../controllers/scrapbook.controller';

const router = Router();

router.get('/', getAllScrapbooks);
router.get('/:id', getScrapbookById);
router.post('/', createScrapbook);
router.put('/:id', updateScrapbook);
router.delete('/:id', deleteScrapbook);

export default router;
