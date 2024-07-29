import { User } from "../models/user.model.js";
import ErrorHandler from "../utils/error.js";
import bcrypt from "bcrypt";

export const updateUser = async (req, res, next) => {
  const { userId } = req.params;

  let {username,email,password,profilePicture}=req.body

  if (userId !== req.user._id) {
    return next(new ErrorHandler("Unauthorised", 400));
  }

  if (password) {
    if (password.length < 6) {
      return next(
        new ErrorHandler("Password must be atleast 6 characters", 400)
      );
    }
    password = await bcrypt.hash(password, 10);
  }

  if (username) {
    if (username.length < 7 || username.length > 20) {
      return next(
        ErrorHandler("Username must be between 7 and 20 characters", 400)
      );
    }

    if (username.includes(" ")) {
      return next(ErrorHandler("Username cannot contain spaces", 400));
    }

    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        ErrorHandler("Username can only contain letters and numbers", 400)
      );
    }

    try {
      let user = await User.findById(userId).select("+password");


      if (!user) {
        return next(new ErrorHandler("User Not Found", 400));
      }

      if (username) {
        user.username = username;
      }
      if (password) {
        user.password = password;
      }
      if (email) {
        user.email = email;
      }
      if (profilePicture) {
        user.profilePicture = profilePicture;
      }

      await user.save();

      return res.status(200).json(user);
    } catch (error) {
      console.log("UPDATE USER ERROR", error);
      return next(new ErrorHandler(error, 400));
    }
  }
};
