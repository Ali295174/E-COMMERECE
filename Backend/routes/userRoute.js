import express from "express"
import { registerController } from "../controller/userController.js";

const userRouter = express.Router();


//http://localhost:8080/users/register
userRouter.post ("/register",registerController);

export default userRouter;

 