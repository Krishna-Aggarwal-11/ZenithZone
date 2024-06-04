import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/err.js";
import User from './../models/User.js';


export const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
      return next(errorHandler(403, "You can delete only your account"));
    }
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.status(200).json("User has been deleted");
    } catch (error) {
      next(error);
    }
  }

  export const logout = (req, res,next) => {
    try {
      res.clearCookie("access_token").status(200).json("User has been logged out");
    } catch (error) {
      next(error);
    }
  }

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You can update only your account"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }
    const salt = bcryptjs.genSaltSync(10);
    req.body.password = bcryptjs.hashSync(req.body.password, salt);
  }
  if (req.body.username) {
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          address: req.body.address,
          phone: req.body.phone,
          password: req.body.password,
          },
      },
      { new: true }
    );
  const { password, ...others } = updatedUser._doc;
  res.status(200).json(others);
  } catch (error) {
    next(error);
  }
}



export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
          return next(errorHandler(404, "User not found"));
        }
        const { password, ...others } = user._doc;
        res.status(200).json(others);
      } catch (error) {
        next(error);
      }
}


