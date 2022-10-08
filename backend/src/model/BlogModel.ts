import { Schema, model } from "mongoose";
import slugify from "slugify";
import { IBlog } from "../helpers/interfaces";

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "A Blog must have a title"],
      unique: true,
      trim: true,
    },
    body: {
      type: String,
      required: [true, "A blog post must have a body"],
      minlength: [30, "A post body must have more or equal to 30 characters"],
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/this-is-rise-up/image/upload/v1660601945/default_blog_gqzbhg.jpg",
    },
    slug: String,
  },
  { timestamps: true }
);

blogSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Blog = model<IBlog>("Blog", blogSchema);

export default Blog;
