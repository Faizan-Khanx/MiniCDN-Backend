import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import { ConnectDB } from "./config/db.js";
import { router } from "./routes/index.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
ConnectDB();
dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use("/uploads",express.static("uploads"))
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set("trust proxy", 1)

app.use("/", router);
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`App Is Listening On: http://localhost:${PORT}`);
});
