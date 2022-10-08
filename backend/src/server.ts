import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION: Shutting down");
  console.log(err.name, err.message);
});

dotenv.config({ path: "./config.env" });

mongoose
  .connect(`${process.env.DATABASE}`)
  .then(() => console.log("Database Connected Successfully"));

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

process.on("unhandledRejection", (err: { name: string; message: string }) => {
  console.log("UNHANDLED REJECTION");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECIEVED. shutting down");
  server.close(() => {
    console.log("Process terminated");
  });
});
