import express from "express";
import ConnectDb from "./config/db.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";


//-------------.env file
dotenv.config();

// -------------connection to mongodb
ConnectDb();

//-------------app setup
const app = express();  

//------------------- middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({origin:"http://localhost:5173", credentials: true}));
app.use(cookieParser());


 //-------------------userroutes
import userRouter from "./routes/userRoute.js";
app.use("/users",userRouter);

 //-------------------SERVER
const Port = process.env.PORT || 8000 ;
app.listen(Port,()=>{
    console.log(`Server is running at Port ${Port}`)
});

