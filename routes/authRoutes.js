import express from "express"
import { RegisterController } from "../Proj17/controllers/authController"

const router = express.Router()

router.use('/auth/register', RegisterController)


export {router}
