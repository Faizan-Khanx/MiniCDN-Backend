import express from "express"
import { GuestCDNUpload } from "../middleware/cdnMiddleware"
const router = express.Router()


router.post('/guest-upload', GuestCDNUpload)