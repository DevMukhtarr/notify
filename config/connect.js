import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
const app = express();

mongoose
  .connect(process.env.MONGO_URI_LOCAL, {
  })
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log("not able to connect to database"+ err);
  });

export default app;