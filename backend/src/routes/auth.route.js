import express from 'express';
import {signup,login,logout,update,check} from '../controllers/auth.controllers.js';
const router = express.Router();
import {protectRoute} from '../middleware/auth.middleware.js';

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);
router.put('/update-profile',protectRoute,update);
router.get('/check',protectRoute,check);

export default router;