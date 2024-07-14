import express from "express"
import {config} from "dotenv"
import connectDB from "./db/connectDB.js"
import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"
import ErrorMiddleware from "./middlewares/errorMiddleware.js"

config({
    path:"./.env"
})

const app=express()

// middlwares
app.use(express.json())

connectDB()

app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`)
})

app.use(ErrorMiddleware)