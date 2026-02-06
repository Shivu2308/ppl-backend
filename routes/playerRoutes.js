import express from 'express';
import { getPublicPlayers, registerPlayer } from '../controllers/playerController.js';
import { upload } from '../config/cloudinaryConfig.js'; // Aapka setup

const router = express.Router();

// Multer multi-field upload setup
const cpUpload = upload.fields([
  { name: 'playerPhoto', maxCount: 1 },
  { name: 'aadharPhoto', maxCount: 1 },
  { name: 'paymentScreenshot', maxCount: 1 }
]);

router.post('/register', cpUpload, registerPlayer);

router.get('/public-list', getPublicPlayers);

export default router;