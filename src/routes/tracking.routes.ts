import { Router } from 'express';
import { trackEvent } from '../controllers/tracking.controller';

const router = Router();

router.post('/', trackEvent);

export default router;
