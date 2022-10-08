import { Document } from "mongoose";

export type File = Express.Multer.File;

export interface IBlog extends Document {
  title: string;
  body: string;
  image: string;
  slug: string;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  passwordConfirm: string | undefined;
  passwordResetToken: string;
  passwordResetExpires: Date;
  passwordChangedAt: Date;
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
  createPasswordResetToken(): string;
}
