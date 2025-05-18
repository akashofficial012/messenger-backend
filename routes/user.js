import express from 'express';
import {   getMyProfile, login, logout, newUser } from '../controller/user.controller.js'; // include `.js` extension!
import { isAuthenticated } from '../middlewares/auth.js';
// import {  singleAvatar } from '../middlewares/multer.js';

const router = express.Router();

router.post('/login', login);
router.post('/register',  newUser);
router.get('/me', isAuthenticated, getMyProfile);
router.post('/logout' , logout)

export default router;
