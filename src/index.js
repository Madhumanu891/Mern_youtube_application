import dotenv from "dotenv";
// require("dotenv").config({path: "./env"})
import express from "express";
import connectBD from "./db/db.js";

dotenv.config();

connectBD();
