import { validationResult } from "express-validator";
import userModel from './../models/user.model.js';
import createUser from "../services/auth.service.js";


export const  signup =async(req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {fullName, email, password } = req.body;
        
        const hashedPassword=await userModel.hashPassword(password);

        const user =await createUser({
            fullName,
            email,
            password: hashedPassword
        });

        const token=await user.generateAuthToken();
        res.json({ user, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
        
    }

}