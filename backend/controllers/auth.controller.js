import { validationResult } from "express-validator";
import userModel from './../models/user.model.js';
import createUser from "../services/auth.service.js";
import cloudinary from './../config/cloudinary.js';


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



export const login=async(req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {email, password } = req.body;
        
        const user=await userModel.findOne({email});
        
        if(!user){
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        const isMatch=await user.comparePassword(password,user.password);
        
        if(!isMatch){
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        const token=await user.generateAuthToken();
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
        });
        res.json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}


export const logout=async(req,res,next) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
      } 
      catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
    };


    export const updateProfile=async(req,res,next) => {
       try {
        const {profilePic} = req.body;
        const userId=req.user._id
      
         if(!profilePic)
         {
             return res.status(400).json({ message: "Profile Pic is required" });
         }

          const uploadResponse=await cloudinary.uploader.upload(profilePic);
          const updatedUser=await userModel.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new:true});
          res.status(200).json(updatedUser);

       } catch (error) {
         console.error("error in updating userProfile",error);
         res.status(500).json({ message: "Server Error" });
       }

    }


    export const checkAuth=async(req,res,next) => {
      try {
        res.status(200).json(req.user)
      } catch (error) {
         console.error("error in checking authentication",error);
         res.status(500).json({ message: "Server Error" });
      }

    }

