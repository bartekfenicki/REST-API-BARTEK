import { Country } from '../interfaces/country';

export interface City extends Document {
    name: string;
    area: number;
    population: number;
    country: Country['name'];
    description: string;
    imageURL: string;
}