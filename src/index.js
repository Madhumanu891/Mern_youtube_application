import dotenv from "dotenv";
// require("dotenv").config({path: "./env"})
import express from "express";
import connectBD from "./db/db.js";
import { app } from "./app.js";

dotenv.config();

connectBD()
.then(()=>{
    app.on("error",(error)=>{
        console.log("ERROR:", error)
        throw error
    })
    app.listen(process.env.PORT || 5000,()=>{
        console.log(`Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGO DB Connection Failed !!!", err)
})
