import express from 'express';
import { signup } from '../controllers/user.controllers.js';

// initialize express router
const router = express.Router();

// Route for user signup
router.post('/signup', signup);





// Export the router
export default router;