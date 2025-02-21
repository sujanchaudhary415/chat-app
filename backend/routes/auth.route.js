import express from "express";
import { body } from "express-validator";
import { checkAuth, login, signup, updateProfile } from "../controllers/auth.controller.js";
import { logout } from './../controllers/auth.controller.js';
import { protectRoute } from "../middlewares/auth.middleware.js";


const authRouter = express.Router();

authRouter.post(
  "/register",
  body("fullName").isString().withMessage("Full name must be a string"),
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  signup
);


authRouter.post(
  "/login",
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  login
  // login  // call the login controller function here
);

authRouter.post("/logout",logout);

authRouter.put("/update-profile",protectRoute,updateProfile);

authRouter.get("/check",protectRoute, checkAuth);



export default authRouter;
