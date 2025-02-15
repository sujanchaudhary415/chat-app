import express from "express";
import authRouter from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import messageRouter from "./routes/message.route.js";

dotenv.config();
const app=express();
const port = process.env.PORT;


app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use('/api/auth',authRouter);
app.use('/api/messages',messageRouter)

app.listen(port,()=>{
    console.log("backend running on port:",port);
    connectDB();
})