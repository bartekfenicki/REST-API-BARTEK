import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import  bcrypt from 'bcrypt';
import Joi, {ValidationResult} from 'joi';
import { User } from '../interfaces/user';
import { userModel } from '../models/userModel';
import { connect, disconnect } from '../repository/database';

export function verifyToken (req: Request, res: Response, next: NextFunction) {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send('Access Denied');
        return;
    }
    try {
        if (token) {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET as string);
            req.body.user = verified;
            next();
        }
    } catch (error) {
        res.status(400).send('Invalid Token' + error);
    }
}


export async function registerUser (req: Request, res: Response) {
    try {
        const {error} = validateUserRegisterationInfo(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        } 
        await connect();

        const emailExists = await userModel.findOne({email: req.body.email});
        if (emailExists) {
            res.status(400).send('Email already exists');
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);   
        
        const userObject = new userModel ({
            id: "_id",
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        const savedUser = await userObject.save(); 
        res.status(200).json({ error: null, data: savedUser._id })
    } 
    catch(error) {
        res.status(500).send('Error registering user' + error);
    } 
    finally {
        await disconnect();
    }
}

export async function loginUser (req: Request, res: Response) {
    try {
        const {error} = validateUserLoginInfo(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        } 
        await connect();
        const user: User | null = await userModel.findOne({email: req.body.email});
        if (!user) {
            res.status(400).send('Email is wrong');
            return;
        } else {
            const validPassword: boolean = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                res.status(400).send('password is wrong');
                return;
            }
            const userId: string = user.id;
            const token: string = jwt.sign({
                name: user.name,
                email: user.email,
                id: userId
            }
            , process.env.TOKEN_SECRET as string, {expiresIn: '2h'});

            res.header('auth-token', token).json({ error: null, data: {userId, token} });
        }
    } 
    catch(error) {
        res.status(500).send('Error logging in user' + error);
    } 
    finally {
        await disconnect();
    }
}

export function validateUserRegisterationInfo(data: User): ValidationResult {
    const schema = Joi.object({
        name: Joi.string().min(3).max(180).required(),
        email: Joi.string().min(3).max(180).required().email(),
        password: Joi.string().min(3).max(180).required(),
    });
    return schema.validate(data);
}

export function validateUserLoginInfo(data: User): ValidationResult {
    const schema = Joi.object({
        email: Joi.string().min(3).max(180).required().email(),
        password: Joi.string().min(3).max(180).required(),
    });
    return schema.validate(data);
} 
