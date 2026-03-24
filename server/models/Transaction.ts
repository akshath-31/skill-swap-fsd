import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  uid: string; // Firebase UID of the user who made the transaction
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  createdAt: Date;
}

const TransactionSchema: Schema = new Schema({
  uid: { type: String, required: true },
  type: { type: String, enum: ['credit', 'debit'], required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
