import express from "express"
import { loginController, logoutController, registerController } from "../controller/userController.js";

const userRouter = express.Router();


//http://localhost:8080/users/register
userRouter.post ("/register",registerController);

//http://localhost:8080/users/login

userRouter.post ("/login",loginController);

//http://localhost:8080/users/logout

userRouter.get("/logout",logoutController);

export default userRouter;

 