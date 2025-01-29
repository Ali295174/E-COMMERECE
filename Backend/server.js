import express from "express";
import ConnectDb from "./config/db.js";
import dotenv from "dotenv";
import morgan from "morgan";



dotenv.config();
// connection to mongodb
ConnectDb();

const app = express();  //through this line we give all properties of express to app.

app.use(morgan("dev"));

// middleware
app.use(express.json());

import userRouter from "./routes/userRoute.js";

// http://localhost:8080/users
app.use("/users",userRouter);

const Port = process.env.PORT || 8000 ;

app.listen(Port,()=>{
    console.log(`Server is running at Port ${Port}`)
});

