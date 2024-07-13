import express from "express"
import {config} from "dotenv"
import connectDB from "./db/connectDB.js"

config({
    path:"./.env"
})

const app=express()

connectDB()

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`)
})