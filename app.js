import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectDB } from "./config/db.js";
import {router} from "./routes/index.js"
ConnectDB()
dotenv.config()

const PORT = process.env.PORT
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/', router)

app.listen(PORT, ()=>{
    console.log(`App Is Listening On: http://localhost:${PORT}`)
})