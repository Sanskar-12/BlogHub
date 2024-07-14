import { User } from "../models/user.model.js";
import ErrorHandler from "../utils/error.js";
import bcrypt from "bcrypt"


export const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
        return next(new ErrorHandler("Please fill all fields.",400))
    }

    let user=await User.findOne({
        email
    })

    if(user)
    {
        return next(new ErrorHandler("User already exists.",400))
    }

    const hashedPassword=await bcrypt.hash(password,10)

    user=new User({
        username,
        email,
        password:hashedPassword
    })

    await user.save()

    return res.status(200).json({
        success:true,
        message:"Signed Up Successfully."
    })

  } catch (error) {
    console.log("SIGN UP ERROR", error);
    return next(new ErrorHandler(error,400))
  }
};
