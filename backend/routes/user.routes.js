import express from 'express';
import { signup, signin } from '../controllers/user.controllers.js';

// initialize express router
const router = express.Router();

// Route for user signup
router.post('/signup', signup);
router.post('/signin', signin);




// Export the router
export default router;