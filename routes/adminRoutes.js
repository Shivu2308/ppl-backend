import express from 'express';
import { login } from '../controllers/adminController.js';
import { verifyAdmin } from '../middleware/authMiddleware.js'; // Alag page se import
import { getPlayersByStatus, approvePlayer } from '../controllers/playerController.js';

const router = express.Router();

// Public Route (Koi bhi khol sakta hai)
router.post('/login', login);

// Protected Routes (Sirf Admin hi khol sakta hai)
router.get('/list/:status', verifyAdmin, getPlayersByStatus);
router.put('/approve/:id', verifyAdmin, approvePlayer);

export default router;