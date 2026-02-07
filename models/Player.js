import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
    playerName: { type: String, required: true },
    fatherName: { type: String, required: true },
    dob: { type: String, required: true },
    aadharNumber: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    

    village: { type: String, required: true }, 
    block: String,
    district: String,
    role: { type: String, required: true },


    playerPhoto: { 
        type: String, 
        required: [true, "Player photo is required"] 
    },

    aadharPhoto: { 
        type: String, 
        required: [true, "Aadhar photo is required"] 
    },

    paymentScreenshot: { 
        type: String, 
        required: [true, "Payment screenshot is required"] 
    },


    battingHand: String,
    battingPosition: String,
    bowlingHand: String,
    bowlingType: String,
    
    
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected'], 
        default: 'pending' 
    },
    
    registrationDate: { type: Date, default: Date.now }
});

export const Player = mongoose.model('Player', playerSchema);