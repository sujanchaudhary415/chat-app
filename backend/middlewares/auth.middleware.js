import userModel from "../models/user.model.js";
import jwt  from 'jsonwebtoken';


export const protectRoute =async (req, res, next) => {
   try {
    const token=req.cookies.jwt;

    if(!token) {
        return res.status(401).json({ msg: 'Not authorized- No token Provided' });
    }
    const decoded=jwt.verify(token, process.env.JWT_SECRET);
   
    if(!decoded) {
        return res.status(401).json({ msg: 'Not authorized- Invalid/Expired token' });
    }
    
    const user=await userModel.findById(decoded.id).select('-password');

    if(!user){
        return res.status(404).json({ msg: 'User not found' });
    }
    req.user=user;
    next();


   } catch (error) {
     console.error(error.message);
     res.status(500).send('Server Error');  
   }

}

