import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true,
  })
);

app.use(express.json({ limit: "16kb" })); // To accept the json
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //To accept the URL Data
app.use(express.static("public")); //To accept the static file , pdf
app.use(cookieParser());

export { app };
