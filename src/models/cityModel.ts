import {Schema, model} from 'mongoose';
import { City } from '../interfaces/city'; 

const citySchema = new Schema<City>({
    name: { type: String, required: true, min: 3, max: 180 },
    area: { type: Number, required: true },
    population: { type: Number, required: true },
    country: { type: String, ref: 'Country', required: true },
    description: { type: String, required: true, min: 3, max: 180 },
    imageURL: { type: String, required: true },    
});

export const cityModel = model<City>('City', citySchema);
