import { Schema, model } from 'mongoose';
import { User } from '../interfaces/user';

const userSchema = new Schema<User>({
    id: { type: String, required: true, min: 3, max: 180 },
    name: { type: String, required: true, min: 3, max: 180 }, 
    email: { type: String, required: true, min: 3, max: 180 },
    password: { type: String, required: true, min: 3, max: 180 },
    registerDate: { type: Date, required: true, default: Date.now },
});

export const userModel = model<User>('User', userSchema); 