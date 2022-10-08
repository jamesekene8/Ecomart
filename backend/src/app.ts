import express, { Application } from "express";
import cors from "cors";
import path from "path";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import dotenv from "dotenv";

import blogRoute from "./routes/blogRoute";

dotenv.config({ path: "./config.env" });

const app: Application = express();

app.use(cors());

app.use((req, res, next) => {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

app.use(compression());

app.use(morgan("tiny"));

app.use(mongoSanitize());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Require static assets from public folder
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json({ type: ["application/json", "text/plain"] })); //This allows express to read

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.urlencoded({ extended: true })); //This allows us to get values from a form in the case of updating users using the inbuilt form e.g <form method='POST' action='/submit'>

// Body parser, reading data from the body into req.body

app.use(cookieParser());

app.use("/api/v1/blog", blogRoute);

export default app;
