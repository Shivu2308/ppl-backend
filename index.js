import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import playerRoutes from './routes/playerRoutes.js'; 
import adminRoutes from './routes/adminRoutes.js';
import connectDB from './DB/db.js';

dotenv.config();
const app = express();
const PORT = 5000;



// Middlewares
app.use(cors()); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

connectDB();



// Routes
app.use('/api/players', playerRoutes);

app.use('/uploads', express.static('uploads'));

app.use('/api/admin', adminRoutes);


app.get('/', (req, res) => {
    res.send('PPL 2026 Backend Server is Running! 🏏');
});


// import { Admin } from './models/Admin.js'; // Path sahi check kar lena

// const seedAdmin = async () => {
//   try {
//     const existingAdmin = await Admin.findOne({ username: 'admin_ppl' });
//     if (!existingAdmin) {
//       await Admin.create({
//         username: 'admin_ppl',
//         password: 'ppl@password2026' // Ye aapka login password hoga
//       });
//       console.log("🚀 PPL Admin Created: admin_ppl / ppl@password2026");
//     } else {
//       console.log("ℹ️ Admin already exists in Database.");
//     }
//   } catch (error) {
//     console.error("❌ Admin seeding error:", error);
//   }
// };

// seedAdmin();


app.listen(PORT, () => {
    console.log(`Server up on http://localhost:${PORT}`);
});