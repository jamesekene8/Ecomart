import mongoose, { Schema, model, Model, SchemaType, Document } from "mongoose";
import validator from "validator";
import { IUser } from "../helpers/interfaces";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Please provide a valid email address"],
      lowercase: true,
      //   unique: [true, "Email already exists"],
    },
    role: {
      type: String,
      default: "member",
      enum: ["admin"],
    },
    password: {
      type: String,
      required: [true, "A user must have a password"],
      minLength: [8, "Password is shorter than minimum allowed length(8)"],
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el: any): boolean {
          return el === Model.schema.paths.password;
        },
        message: "Passwords do not match",
      },
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordChangedAt: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!this.isModified("password")) return next();

  user.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  return next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// userSchema.methods.changedPasswordAfter = function (JWTTimestamp: any) {
//   if (this.passwordChangedAt) {
//     const changedTimestamp = parseInt(
//       this.passwordChangedAt.getTime() / 1000,
//       10
//     );

//     return JWTTimestamp < changedTimestamp;
//   }

//   // False means NOT changed
//   return false;
// };

const User = mongoose.model<IUser>("User", userSchema);

export { User };
