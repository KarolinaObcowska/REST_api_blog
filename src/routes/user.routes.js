import { Router } from 'express';
import { getUserStatus, updateStatus } from '../controllers/user.controllers';
import { protect } from '../middleware/protect';

const router = Router();

router.get('/', protect, getUserStatus);
router.put('/', protect, updateStatus);

export default router;