import { errorHandler } from "../utils/err.js";
import User from "./../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    next(errorHandler(400, "Please add all fields"));
  }

  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  try {
    await newUser.save();
    res.status(201).json("User has been created");
  } catch (error) {
    next(error);
  }
};

export const Login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(errorHandler(400, "Please add all fields"));
  }

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return next(errorHandler(404, "User not found"));
    }
    const isMatch = bcryptjs.compareSync(password, foundUser.password);
    if (!isMatch) {
      return next(errorHandler(401, "Invalid credentials"));
    }
    const token = jwt.sign({ id: foundUser._id ,isAdmin : foundUser.isAdmin}, process.env.JWT_SECRET_KEY);
    const { password: pass, ...others } = foundUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(others);
  } catch (error) {
    next(error);
  }
};
