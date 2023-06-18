import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import match from "./routers/match.js";

//to use the file .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
//to log request http
app.use(morgan("dev"));

app.use("/match", match);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`The API listening on: ${process.env.SERVER_PORT}`);
});
