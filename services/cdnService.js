import sharp from "sharp";
import path from "path";
import fs from "fs";
import { AppError } from "../utils/errorHandler.js";
import { CDNSchema } from "../models/mediaModels.js";

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
  } catch (err) {
    console.error(`Error in GuestCDNService: ${err.message}`);
    throw new AppError(`Error In Processing the file`, 500);
  }
};
const userCDN = async(file, userId)=>{
    try{
        const cdn = await CDNService(file)
        const path = `uploads/${cdn.fileName}`
        const SaveinDB = await CDNSchema.create({
            userId:userId,
            fileName:cdn.fileName,
            originalSize:cdn.originalSize,
            compressedSize:cdn.compressedSize,
            savingpercent:cdn.savingsPercent,
            url:`${path}`
        })
        console.log(`Logs Saved in Database`)
        return SaveinDB

    }catch(err){
        console.log(`Error In UserCDN: ${err.message}`)
        throw new AppError(`An Error Occured`, 500)
    }

}
export { CDNService, userCDN};
