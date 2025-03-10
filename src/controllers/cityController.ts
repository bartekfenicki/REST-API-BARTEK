import { Request, Response } from "express";
import { cityModel } from '../models/cityModel';
import { connect, disconnect } from '../repository/database';

// @param req 
// @param res

export async function addCity(req: Request, res: Response): Promise<void> {

    const data = req.body;

    try {
        await connect();
        const product = new cityModel(data); 
        const result = await product.save();
        res.status(200).send(result);
    } 
    catch (error) {
        res.status(500).send("error adding a city " + error);
    } 
    finally {
        await disconnect(); 
    }
}

// @param req   
// @param res

export async function getAllCities(req: Request, res: Response): Promise<void> {
    try {
        await connect();
        const result = await cityModel.find();
        res.status(200).send(result);
    } 
    catch (error) {
        res.status(500).send("error retirieving all cities" + error);
    } 
    finally {
        await disconnect();
    }
}

export async function getCityById(req: Request, res: Response): Promise<void> {
    try {
        await connect();
        const id = req.params.id;
        const result = await cityModel.find({_id: id});
        res.status(200).send(result);
    } 
    catch (error) {
        res.status(500).send("error getting a specific city " + error);
    } 
    finally {
        await disconnect();
    }
}

export async function updateCityById(req: Request, res: Response): Promise<void> {
    try {
        await connect();
        const id = req.params.id;
        const result = await cityModel.findByIdAndUpdate(id, req.body);
        if (!result) {
            res.status(404).send("city not found");
        } else {
            res.status(200).send(result);   
        }
        
    } 
    catch (error) {
        res.status(500).send("error while updating city info" + error);
    } 
    finally {
        await disconnect();
    }
}

export async function deleteCityById(req: Request, res: Response): Promise<void> {
    try {
        await connect();
        const id = req.params.id;
        const result = await cityModel.findByIdAndDelete(id);
        if (!result) {
            res.status(404).send("city not found, cannot delete");
        } else {
            res.status(200).send(result);   
        }
        
    } 
    catch (error) {
        res.status(500).send("error getting a city, cannot delete " + error);
    } 
    finally {
        await disconnect();
    }
}