import express, { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import Blog from "../model/BlogModel";
import AppError from "../utils/appError";
import slugify from "slugify";
import multer from "multer";
import cloudinary from "../utils/imageUpload";
import { v4 as uuidv4 } from "uuid";
import { File } from "../helpers/interfaces";

const multerStorage = multer.diskStorage({});

const multerFilter = (req: Request, file: File, cb: any): void => {
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

const uploadBlogPhoto = upload.single("blogImage");

const resizeBlogPhoto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();
    const result = await cloudinary.uploader.upload(req.file.path, {
      publid_id: `blog-${uuidv4()}-${Date.now()}_post.jpeg`,
      width: 785,
      height: 400,
      crop: "fill",
    });
    req.file.filename = result.url;
    next();
  }
);

const getAllPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await Blog.find();
    res.status(200).json({
      status: "success",
      posts,
    });
  }
);

const getPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await Blog.findById(req.params.id);
    if (!post) return next(new AppError("Post does not exist", 404));
    res.status(200).json({ status: "success", data: post });
  }
);

const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      req.body.image = req.file.filename;
    }
    const post = await Blog.create(req.body);
    res.status(201).json({ status: "success", data: post });
  }
);

const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const post = await Blog.findById(req.params.id);
    if (req.file) {
      const imagePublicId = post!.image.split("/").slice(-1)[0].split(".")[0];
      try {
        await cloudinary.uploader.destroy(
          imagePublicId,
          function (error, result) {}
        );
      } catch (error) {}
      req.body.image = req.file.filename;
    }
    if (!post) return next(new AppError("Blog Post does not exist", 404));
    if (req.body.title) {
      req.body.slug = slugify(req.body.title, { lower: true });
    }
    const updatedPost = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: "success", data: updatedPost });
  }
);

const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const blog = await Blog.findById(req.params.id);
    if (
      blog!.image !==
      "https://res.cloudinary.com/this-is-rise-up/image/upload/v1660601945/default_blog_gqzbhg.jpg"
    ) {
      const imagePublicId = blog!.image.split("/").slice(-1)[0].split(".")[0];
      try {
        await cloudinary.uploader.destroy(
          imagePublicId,
          function (error, result) {}
        );
      } catch (error) {}
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success" });
  }
);

export {
  uploadBlogPhoto,
  deletePost,
  updatePost,
  createPost,
  getAllPosts,
  getPost,
  resizeBlogPhoto,
};
