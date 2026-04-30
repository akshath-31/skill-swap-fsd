import mongoose, { Schema } from 'mongoose';

const TransactionSchema = new Schema({
  uid: { type: String, required: true },
  type: { type: String, enum: ['credit', 'debit'], required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Transaction', TransactionSchema);
