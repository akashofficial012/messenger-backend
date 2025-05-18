import express from 'express';
import { login, newUser } from '../controller/user.controller.js'; // include `.js` extension!
import {  singleAvatar } from '../middlewares/multer.js';

const router = express.Router();

router.post('/login', login);
router.post('/register',  newUser);

export default router;
