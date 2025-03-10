import {Schema, model} from 'mongoose';
import { Country } from '../interfaces/country'; 

const countrySchema = new Schema<Country>({
    name: { type: String, required: true, min: 3, max: 180 },
    capital: { type: String, required: true, min: 3, max: 180 },
    area: { type: Number, required: true },
    population: { type: Number, required: true },
    currency: { type: String, required: true },
    description: { type: String, required: true, min: 3, max: 180 },
    imageURL: { type: String, required: true },    
});

export const countryModel = model<Country>('Country', countrySchema);
