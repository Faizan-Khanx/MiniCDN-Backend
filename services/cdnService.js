import sharp from "sharp";
import path from "path";
import fs from "fs";
import { AppError } from "../utils/errorHandler.js";
import { CDNSchema } from "../models/mediaModels.js";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
const CDNService = async (file) => {
  try {
    if (file.mimetype.startsWith("image/")) {
      const fileName = `media-${Date.now()}.webp`;
      const outputFile = path.join("uploads", fileName);
      console.log(`File Received In Service`);
      const cdn = await sharp(file.buffer)
        .webp({ quality: 80 })
        .toFile(outputFile);
      const originalSize = file.size;
      const compressedSize = cdn.size;
      const savingsPercent = (
        ((originalSize - compressedSize) / originalSize) *
        100
      ).toFixed(2);
      console.log(`Achieve ${savingsPercent} % compressibility`);
      return {
        fileName: fileName,
        originalSize,
        compressedSize,
        savingsPercent,
      };
    }
    if (file.mimetype.startsWith("video/")) {
      const fileName = `media-${Date.now()}.mp4`;
      const outputFile = path.join("uploads", fileName);
      const tempInput = path.join(
        "uploads",
        `temp-${Date.now()}-${file.originalname}`,
      );
      await fs.promises.writeFile(tempInput, file.buffer);
      await new Promise((resolve, reject) => {
        ffmpeg(tempInput)
          .videoCodec("libx264")
          .audioCodec("aac")
          .audioBitrate("128k")
          .outputOptions(["-crf 28", "-preset fast", "-movflags +faststart"])
          .on("progress", async (progress) => {
            console.log(`Video Compression in progress: ${progress.percent} %`);
          })
          .on("end", async () => {
            console.log(`Video Compressed Successfully`);
            await fs.promises.unlink(tempInput).catch(() => {});
            resolve();
          })

          .on("error", async (err) => {
            console.error(`Error In compressing the video: ${err.message}`);
            await fs.promises.unlink(tempInput).catch(() => {});
            reject(err);
          })
          .save(outputFile);
      });
      const originalSize = file.size;
      const compressedSize = (await fs.promises.stat(outputFile)).size;
      const savingsPercent = (
        ((originalSize - compressedSize) / originalSize) *
        100
      ).toFixed(2);
      return {
        fileName,
        originalSize,
        compressedSize,
        savingsPercent,
      };
    }
  } catch (err) {
    console.error(`Error in GuestCDNService: ${err.message}`);
    throw new AppError(`Error In Processing the file`, 500);
  }
};

const userCDN = async (file, userId) => {
  try {
    const cdn = await CDNService(file);
    const path = `uploads/${cdn.fileName}`;
    const SaveinDB = await CDNSchema.create({
      userId: userId,
      fileName: cdn.fileName,
      originalSize: cdn.originalSize,
      compressedSize: cdn.compressedSize,
      savingpercent: cdn.savingsPercent,
      url: `${path}`,
    });
    console.log(`Logs Saved in Database`);
    return SaveinDB;
  } catch (err) {
    console.log(`Error In UserCDN: ${err.message}`);
    throw new AppError(`An Error Occured`, 500);
  }
};

const GetUserAllImages = async (userId) => {
  try {
    const image = await CDNSchema.find({ userId: userId });
    console.log(`Sending Images`);
    return image;
  } catch (err) {
    console.error(`Error In Getting User Images: ${err.message}`);
    throw new AppError("Error In Retreving Images", 500);
  }
};
export { CDNService, userCDN, GetUserAllImages };
