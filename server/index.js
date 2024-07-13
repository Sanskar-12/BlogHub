import express from "express"
import {config} from "dotenv"
import connectDB from "./db/connectDB.js"
import userRoute from "./routes/user.route.js"

config({
    path:"./.env"
})

const app=express()

connectDB()

app.use("/api/user",userRoute)

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`)
})