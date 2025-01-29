
import userModel from "../Models/userModel.js";

const registerController = async(req, res) => {
  try {

    const { name, email, Password } = req.body;
    if (!name || !email || !Password) {
      return res
        .status(401)
        .send({ success: false, message: "All feilds are required" });
       
    }


    const userExist = await userModel.findOne({email});
    if (userExist){
        return res
        .status(401)
        .send({ success: false, message: "Email already exsist" });
       };

       if (Password.length < 8) {
        return res
          .status(400)
          .send({ success: false, message: "Password must be at least 8 characters long" });
      }



    const newUser = await userModel.create({ name, email, Password });
    return res
      .status(200)
      .send({ success: true, message: "User registered Successfully" });
  } catch (error) {
    res.status(400).send(`Error in registerController  ${error.message}`);
  }
};

export { registerController };
