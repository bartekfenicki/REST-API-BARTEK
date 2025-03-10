export interface Country extends Document {
    name: string;
    capital: string;
    area: number;
    population: number;
    currency: string;
    description: string;
    imageURL: string;
}