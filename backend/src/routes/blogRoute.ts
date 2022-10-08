import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  resizeBlogPhoto,
  updatePost,
  uploadBlogPhoto,
} from "../controller/blogController";

// import { protect } from "../controller/authController";

const router = express.Router();

router
  .route("/")
  .get(getAllPosts)
  .post(uploadBlogPhoto, resizeBlogPhoto, createPost);

router
  .route("/:id")
  .get(getPost)
  .patch(uploadBlogPhoto, resizeBlogPhoto, updatePost)
  .delete(deletePost);

export default router;
