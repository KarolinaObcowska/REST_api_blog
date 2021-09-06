import { Router } from 'express';
import { getMe, getUserStatus, updateStatus } from '../controllers/user.controllers';
import { protect } from '../middleware/protect';

const router = Router();

router.get('/me', protect, getMe);
router.get('/', protect, getUserStatus);
router.put('/', protect, updateStatus);

export default router;