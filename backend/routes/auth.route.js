import express from 'express';
import { body } from 'express-validator';
import { signup } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/register',
    body("fullName").isString().withMessage("Full name must be a string"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 8 characters long"),
    signup);

    export default authRouter;