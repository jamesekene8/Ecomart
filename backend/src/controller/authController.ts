import { Response, Request, NextFunction } from "express";
import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { promisify } from "util";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { File, IUser } from "../helpers/interfaces";
import cloudinary from "../utils/imageUpload";
import dotenv from "dotenv";
import { User } from "../model/userModel";

dotenv.config({ path: "./config.env" });

const multerStorage = multer.diskStorage({});

const multerFilter = (req: Request, file: File, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new AppError("This is not an image. Please, upload only images", 400),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 },
});

export const uploadMyPhoto = upload.single("image");

export const resizeMyPhoto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();
    const result = await cloudinary.uploader.upload(req.file.path, {
      publid_id: `user-${uuidv4()}-${Date.now()}_profile.jpeg`,
      width: 200,
      height: 200,
      crop: "fill",
    });
    req.file.filename = result.url;
    next();
  }
);

const signToken = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (
  user: any,
  statusCode: number,
  req: Request,
  res: Response
) => {
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      `${
        Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN! * 24 * 60 * 60 * 1000
      }`
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // remove the user password from the input
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.create(req.body);

    res.status(200).json({
      status: "success",
      data: user,
    });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(new AppError("Incorrect email or password", 401));
    if (
      !user ||
      !(await user.correctPassword(req.body.password, user.password))
    ) {
      return next(new AppError("Incorrect email or password", 401));
    }
    createSendToken(user, 200, req, res);
  }
);

export const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new AppError("Please provide an email address", 404));
  const user = await User.findOne({ email });
  if (!user)
    return next(new AppError("There is no user with that email address", 404));
  //This password was defined in the model and it is used to create a password reset token
  const resetToken = user.createPasswordResetToken();
  // This is telling mongoDB not to validate before saving
  await user.save({ validateBeforeSave: false });
  //Building the Reset Password IRL
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/resetPassword/?token=${resetToken}`;
  //This is the message that will be passed to the email function
  const message = `Forgot password? click on the following link: ${resetUrl} to reset your password`;
  //Creating a try catch block to receive the data from send Email
  try {
    await sendEmail({ email: user.email, subject: "Forgot Password", message });
    res.status(200).json({
      status: "success",
      resetUrl,
      message: "Reset URL has been sent successfully",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError("There was an error sending the mail. Try again later!")
    );
  }
});

// exports.resetPassword = catchAsync(async (req, res, next) => {
//   const { token } = req.params;
//   const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
//   const user = await User.findOne({
//     passwordResetToken: hashedToken,
//     passwordResetExpires: { $gt: Date.now() },
//   });
//   user.password = req.body.password;
//   user.passwordConfirm = req.body.passwordConfirm;
//   user.passwordResetToken = undefined;
//   user.passwordResetExpires = undefined;
//   await user.save();
//   res.status(200).json({
//     status: "success",
//     message: "Password has been reset successfully.",
//   });
// });

// exports.protect = catchAsync(async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   } else if (req.cookies.jwt) {
//     token = req.cookies.jwt;
//   }

//   if (!token) res.redirect("/login");

//   jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
//     if (err) {
//       res.redirect("/login");
//     }
//   });

//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//   const currentUser = await User.findById(decoded.id);

//   if (!currentUser) {
//     return next(
//       new AppError("The user belonging to this token no longer exists", 401)
//     );
//   }

//   if (currentUser.changedPasswordAfter(decoded.iat)) {
//     return next(
//       new AppError("User recently changed password! Please log in again.", 401)
//     );
//   }

//   req.user = currentUser;
//   next();
// });

// exports.updatePassword = catchAsync(async (req, res, next) => {
//   const user = await User.findById(req.user._id);

//   if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
//     return next(new AppError("Incorrect password!", 401));
//   }

//   user.password = req.body.password;
//   user.passwordConfirm = req.body.passwordConfirm;
//   await user.save();

//   createSendToken(user, 200, req, res);
// });

// exports.isLoggedIn = async (req, res, next) => {
//   if (req.cookies.jwt) {
//     try {
//       // Verifies the token
//       const decoded = await promisify(jwt.verify)(
//         req.cookies.jwt,
//         process.env.JWT_SECRET
//       );

//       //3) Check if the user still exists
//       const currentUser = await User.findById(decoded.id);
//       if (!currentUser) {
//         return next();
//       }

//       // 4) Check if the user changed password after the token was issued
//       if (currentUser.changedPasswordAfter(decoded.iat)) {
//         return next();
//       }

//There is a logged in User
//res.locals is used to set variables inside the pug template
//       res.locals.user = currentUser;
//       req.user = currentUser;
//       return next();
//     } catch (error) {
//       return next();
//     }
//   }
//   next();
// };

// exports.logout = (req, res) => {
//   res.cookie("jwt", "loggedouttoken", {
//     expires: new Date(Date.now() + 10 * 1000),
//     httpOnly: true,
//   });
//   res.status(200).json({
//     status: "success",
//   });
// };

// exports.onlyAdmin = catchAsync(async (req, res, next) => {
//   if (req.user.role === "member") {
//     res.redirect("/admin");
//   }
//   next();
// });

// exports.updateMe = catchAsync(async (req, res, next) => {
//   if (req.body.password || req.body.passwordConfirm) {
//     return next(
//       new AppError("You cannot update your password using this route.", 400)
//     );
//   }
//   const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   res.status(200).json({
//     status: "success",
//     user: updatedUser,
//   });
// });

// exports.forgotPassword = catchAsync(async (req, res, next) => {
//   const { email } = req.body;
//   if (!email) return next(new AppError("Please provide an email address", 404));
//   const user = await User.findOne({ email });
//   if (!user)
//     return next(new AppError("There is no user with that email address", 404));
//   //This password was defined in the model and it is used to create a password reset token
//   const resetToken = user.createPasswordResetToken();
//   // This is telling mongoDB not to validate before saving
//   await user.save({ validateBeforeSave: false });
//   //Building the Reset Password IRL
//   const resetUrl = `${req.protocol}://${req.get(
//     "host"
//   )}/resetPassword/?token=${resetToken}`;
//   //This is the message that will be passed to the email function
//   const message = `Forgot password? click on the following link: ${resetUrl} to reset your password`;
//   //Creating a try catch block to receive the data from send Email
//   try {
//     await sendEmail({ email: user.email, subject: "Forgot Password", message });
//     res.status(200).json({
//       status: "success",
//       resetUrl,
//       message: "Reset URL has been sent successfully",
//     });
//   } catch (error) {
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save({ validateBeforeSave: false });
//     return next(
//       new AppError("There was an error sending the mail. Try again later!")
//     );
//   }
// });

// exports.resetPassword = catchAsync(async (req, res, next) => {
//   const { token } = req.params;
//   const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
//   const user = await User.findOne({
//     passwordResetToken: hashedToken,
//     passwordResetExpires: { $gt: Date.now() },
//   });
//   user.password = req.body.password;
//   user.passwordConfirm = req.body.passwordConfirm;
//   user.passwordResetToken = undefined;
//   user.passwordResetExpires = undefined;
//   await user.save();
//   res.status(200).json({
//     status: "success",
//     message: "Password has been reset successfully.",
//   });
// });
