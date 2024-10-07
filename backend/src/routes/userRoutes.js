import express from 'express';
import { userLoginCtrl, userRegistrationCtrl } from '../controllers/user/userAuthCtrl.js';
const router = express.Router();
router.post('/register', userRegistrationCtrl);
router.post('/login', userLoginCtrl)

export default router;
