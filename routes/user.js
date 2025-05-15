import express from 'express';
import { login } from '../controller/user.controller.js'; // include `.js` extension!

const router = express.Router();

router.get('/login', login);

export default router;
