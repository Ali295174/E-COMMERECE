import { encryptedPassword, matchPassword } from "../helper/userHelper.js";
import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import cookie from "cookie-parser";

//----------------------------------------------registerController
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(401)
        .send({ success: false, message: "All feilds are required" });
    }

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res
        .status(401)
        .send({ success: false, message: "Email already exsist" });
    }

    if (password.length < 8) {
      return res.status(400).send({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const hashedPassword = await encryptedPassword(password);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(200).send({
      success: true,
      message: "User registered Successfully",
      newUser,
    });
  } catch (error) {
    res.status(400).send(`Error in registerController  ${error.message}`);
  }
};

//--------------------------------------------loginController
const loginController = async (req, res) => {
  //--------------------------------------------save password and email from req.body
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(401)
      .send({ success: false, message: "All feilds are required" });
  }

  //--------------------------------------------find user by email in database

  const userEmail = await userModel.findOne({ email });
  if (!userEmail) {
    return res
      .status(401)
      .send({ success: false, message: "email is not registered" });
  }
  //--------------------------------------------compare password from request with password in database

  const isMatch = await matchPassword(password, userEmail.password);

  if (!isMatch) {
    return res
      .status(400)
      .send({ success: false, message: "Invalid Password" });
  }
  //--------------------------------------------if password and email are correct then remove password from user data

  const token = await jwt.sign({ id: userEmail._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  userEmail.password = undefined;
  //--------------------------------------------if password and email are correct then return user data

  return res
    .cookie("token", token, { httpOnly: true, secure: true })
    .status(200)
    .send({
      success: true,
      message: "User login successfully",
      userEmail,
      token,
    });
};

//---------------------------------------------logoutController
const logoutController = async (req, res) => {
  
  return res
    .cookie("token", " ", { httpOnly: true, secure: true, expires: new Date(0)})
    .status(200)
    .send({
      success: true,
      message: "User logout successfully",
    });
};

export { registerController, loginController,logoutController };
