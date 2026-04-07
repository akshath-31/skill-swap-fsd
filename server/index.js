import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Skill from './models/Skill.js';
import User from './models/User.js';
import Transaction from './models/Transaction.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skill-swap';

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  if (req.method === 'POST') console.log('Body:', req.body);
  next();
});

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB local instance'))
  .catch((err) => console.error('❌ Failed to connect to MongoDB:', err));

// --- User Routes ---
// Sync user from Firebase (UID, name, email)
app.post('/api/users/sync', async (req, res) => {
  const { uid, name, email, avatar } = req.body;
  try {
    let user = await User.findOne({ uid });
    if (!user) {
      // Create new user with default credits if not exists
      user = new User({ uid, name, email, avatar, credits: 100 });
      await user.save();
      // Add a welcome transaction
      const welcomeTx = new Transaction({
        uid,
        type: 'credit',
        amount: 100,
        description: 'Welcome bonus'
      });
      await welcomeTx.save();
    } else {
      // Update existing user info
      user.name = name;
      user.email = email;
      user.avatar = avatar;
      await user.save();
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error syncing user', error: err });
  }
});

// Get user by UID
app.get('/api/users/:uid', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err });
  }
});

// --- Transaction Routes ---
// Get transactions for a user
app.get('/api/transactions/:uid', async (req, res) => {
  try {
    const txs = await Transaction.find({ uid: req.params.uid }).sort({ createdAt: -1 });
    res.json(txs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transactions', error: err });
  }
});

// --- Skill Routes ---
// Fetch all skills (optional filter by type or uid)
app.get('/api/skills', async (req, res) => {
  const { type, uid, excludeUid } = req.query;
  const filter: any = {};
  if (type) filter.type = type;
  if (uid) filter.uid = uid;
  if (excludeUid) filter.uid = { $ne: excludeUid };
  
  try {
    const skills = await Skill.find(filter).sort({ createdAt: -1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching skills', error: err });
  }
});

// Create a new skill
app.post('/api/skills', async (req, res) => {
  try {
    const newSkill = new Skill(req.body);
    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill);
  } catch (err) {
    res.status(400).json({ message: 'Error creating skill', error: err });
  }
});

// Delete a skill
app.delete('/api/skills/:id', async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Skill deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting skill', error: err });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
