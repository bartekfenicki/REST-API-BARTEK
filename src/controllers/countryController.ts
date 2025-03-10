import { Request, Response } from "express";
import { countryModel } from '../models/countryModel';
import { connect, disconnect } from '../repository/database';

// @param req 
// @param res

export async function addCountry(req: Request, res: Response): Promise<void> {

    const data = req.body;

    try {
        await connect();
        const product = new countryModel(data); 
        const result = await product.save();
        res.status(200).send(result);
    } 
    catch (error) {
        res.status(500).send("error adding a country " + error);
    } 
    finally {
        await disconnect(); 
    }
}

// @param req   
// @param res

export async function getAllCountries(req: Request, res: Response): Promise<void> {
    try {
        await connect();
        const result = await countryModel.find();
        res.status(200).send(result);
    } 
    catch (error) {
        res.status(500).send("error retirieving all countries" + error);
    } 
    finally {
        await disconnect();
    }
}

export async function getCountryById(req: Request, res: Response): Promise<void> {
    try {
        await connect();
        const id = req.params.id;
        const result = await countryModel.find({_id: id});
        res.status(200).send(result);
    } 
    catch (error) {
        res.status(500).send("error getting a specific country " + error);
    } 
    finally {
        await disconnect();
    }
}

export async function updateCountryById(req: Request, res: Response): Promise<void> {
    try {
        await connect();
        const id = req.params.id;
        const result = await countryModel.findByIdAndUpdate(id, req.body);
        if (!result) {
            res.status(404).send("country not found");
        } else {
            res.status(200).send(result);   
        }
        
    } 
    catch (error) {
        res.status(500).send("error while updating country info" + error);
    } 
    finally {
        await disconnect();
    }
}

export async function deleteCountryById(req: Request, res: Response): Promise<void> {
    try {
        await connect();
        const id = req.params.id;
        const result = await countryModel.findByIdAndDelete(id);
        if (!result) {
            res.status(404).send("country not found, cannot delete");
        } else {
            res.status(200).send(result);   
        }
        
    } 
    catch (error) {
        res.status(500).send("error getting a country, cannot delete " + error);
    } 
    finally {
        await disconnect();
    }
}