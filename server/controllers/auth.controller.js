import { User } from "../models/user.model.js";
import ErrorHandler from "../utils/error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      return next(new ErrorHandler("Please fill all fields.", 400));
    }

    let user = await User.findOne({
      email,
    });

    if (user) {
      return next(new ErrorHandler("User already exists.", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Signed Up Successfully.",
    });
  } catch (error) {
    console.log("SIGN UP ERROR", error);
    return next(new ErrorHandler(error, 400));
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
      return next(ErrorHandler("All fields are required", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Email or Password is incorrect", 400));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("Email or Password is incorrect", 400));
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .cookie("bloghubtoken", token, {
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Signed In Successfully",
        user,
      });
  } catch (error) {
    onsole.log("SIGN IN ERROR", error);
    return next(new ErrorHandler(error, 400));
  }
};
