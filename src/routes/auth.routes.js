import { Router } from 'express';
import { check } from 'express-validator';
import { signup, signin } from '../controllers/auth.controllers';

const router = Router();

router.post('/signup', [
    check('firstname', 'First name is required')
        .not()
        .isEmpty(),
    check('lastname', 'Last name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email')
        .isEmail(),
    check('password', 'Please enter a password with 8 or more characters')
        .isLength({ min: 8 })
], signup);

router.post('/signin', [
    check('email', 'Please include a valid email')
        .isEmail(),
    check('password', 'Please enter a password with 8 or more characters')
        .isLength({ min: 8 })
], signin);

export default router;