import { Player } from '../models/Player.js';
import { upload } from '../config/cloudinaryConfig.js';

export const registerPlayer = async (req, res) => {
  try {
    const {
      playerName, fatherName, dob, aadharNumber, mobileNumber,
      village, block, district, role, utrNumber,
      battingHand, battingPosition, bowlingHand, bowlingType
    } = req.body;

    // 1. Duplicate Check (Aadhar or UTR)
    const existingPlayer = await Player.findOne({ 
      $or: [{ aadharNumber }, { utrNumber }] 
    });

    if (existingPlayer) {
      return res.status(400).json({ 
        success: false, 
        message: "Bhai, ye Aadhar ya UTR pehle se use ho chuka hai!" 
      });
    }

    // 2. Photos Check (Multer puts files in req.files when using .fields())
    if (!req.files || !req.files.playerPhoto || !req.files.aadharPhoto || !req.files.paymentScreenshot) {
      return res.status(400).json({ success: false, message: "Teeno photos upload karna zaroori hai!" });
    }

    // ⚡ MAGIC: Multer-Storage-Cloudinary already uploaded files!
    // Hamein bas unka 'path' (jo Cloudinary URL hai) uthana hai.
    const playerPhotoUrl = req.files.playerPhoto[0].path;
    const aadharPhotoUrl = req.files.aadharPhoto[0].path;
    const screenshotUrl = req.files.paymentScreenshot[0].path;

    // 3. Database mein save karein
    const newPlayer = new Player({
      playerName, fatherName, dob, aadharNumber, mobileNumber,
      village, block, district, role, utrNumber,
      battingHand, battingPosition, bowlingHand, bowlingType,
      playerPhoto: playerPhotoUrl,
      aadharPhoto: aadharPhotoUrl,
      paymentScreenshot: screenshotUrl,
      status: 'pending' 
    });

    await newPlayer.save();

    res.status(201).json({ 
      success: true, 
      message: "Registration Successful! Admin verification ka intezar karein. 🏏" 
    });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
};

// 4. Admin ke liye List dikhane ka logic
export const getPlayersByStatus = async (req, res) => {
  try {
    const { status } = req.params; // pending ya approved
    const players = await Player.find({ status }).sort({ registrationDate: -1 });
    res.status(200).json({ success: true, players });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. Admin ke liye Approve karne ka logic
export const approvePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // Frontend se 'approved' ya 'rejected' aayega

    const updatedPlayer = await Player.findByIdAndUpdate(
      id, 
      { status: status }, // status update hoga (approved/rejected)
      { new: true }
    );

    res.status(200).json({ 
      success: true, 
      message: `Player is now ${status}! ✅` 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




export const getPublicPlayers = async (req, res) => {
  try {
    // Sirf approved players aur zaroori details hi bhejenge (Aadhar hide rakhenge)
    const players = await Player.find({ status: 'approved' })
                                .select('playerName fatherName role battingHand battingPosition bowlingHand bowlingType playerPhoto village block district');
    
    res.status(200).json({ success: true, players });
  } catch (error) {
    res.status(500).json({ success: false, message: "List load nahi ho payi!" });
  }
};