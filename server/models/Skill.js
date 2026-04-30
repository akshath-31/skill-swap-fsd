import mongoose, { Schema } from 'mongoose';

const SkillSchema = new Schema({
  uid: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  credits: { type: Number, required: true },
  students: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  type: { type: String, enum: ['offer', 'request'], default: 'offer' },
  teacherName: { type: String, required: true },
  teacherAvatar: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Skill', SkillSchema);
