import express from "express";
import {
  register,
  login,
  protect,
  forgetPassword,
  resetPassword,
  updatePassword,
} from "../controller/authController";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", protect, logout);

router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);

router.patch("/updatePassword", protect, updatePassword);

router.patch("/updateMe", protect, updateMe);

module.exports = router;
