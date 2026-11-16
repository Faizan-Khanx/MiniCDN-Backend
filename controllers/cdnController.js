import {
  CDNService,
  userCDN,
  GetUserAllImages,
  DeleteUserImage,
} from "../services/cdnService.js";

const userCDNController = async (req, res, next) => {
  try {
    const file = req.file;
    console.log(req.file);
    console.log(req.body);
    const CDN = await userCDN(file, req.user.id);
    return res.status(200).json({
      message: "File Upload Sucessfull",
      filetype: file.mimetype,
      originalSize: `${(CDN.originalSize / (1024 * 1024)).toFixed(2)} MB`,
      compressedSize: `${(CDN.compressedSize / (1024 * 1024)).toFixed(2)} MB`,
      savingPercentage: `${CDN.savingspercent} %`,
      url: `${req.protocol}://${req.get("host")}/${CDN.url}`,
    });
  } catch (err) {
    console.log(`Error in UserCDNController: ${err.message}`);
    next(err);
  }
};
const CDNController = async (req, res, next) => {
  try {
    const file = req.file;
    console.log(req.file);
    console.log(req.body);
    const CDN = await CDNService(file);
    return res.status(200).json({
      message: "File Upload Sucessfull",
      filetype: file.mimetype,
      originalSize: `${(CDN.originalSize / (1024 * 1024)).toFixed(2)} MB`,
      compressedSize: `${(CDN.compressedSize / (1024 * 1024)).toFixed(2)} MB`,
      savingPercentage: `${CDN.savingsPercent} %`,
      url: `${req.protocol}://${req.get("host")}/uploads/${CDN.fileName}`,
    });
  } catch (err) {
    console.log(`Error in GuestCDNController: ${err.message}`);
    next(err);
  }
};

const UserAllImagesController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const media = await GetUserAllImages(userId);
    console.log(`Images Received, Sending it to user`);
    const formattedImage = media.map((item) => ({
      filename: item.fileName,
      url: `${req.protocol}://${req.get("host")}/${item.url}`,
      originalSize: `${(item.originalSize / 1024).toFixed(2)} KB`,
      compressedSize: `${(item.compressedSize / 1024).toFixed(2)} KB`,
      savingPercentage: `${item.savingpercent} %`,
    }));
    return res.status(200).json({ message: "Success", images: formattedImage });
  } catch (err) {
    console.log(`Error In User All Images Controller: ${err.message}`);
    next(err);
  }
};

const DeleteImageController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const fileName = req.params.fileName;
    if (!fileName) {
      console.log(`Filename is required`);
      return res.status(404).json({ message: "Filename is required" });
    }
    await DeleteUserImage(userId, fileName);
    return res
      .status(200)
      .json({ message: `File ${fileName} Deleted Sucessfully` });
  } catch (err) {
    console.log(`Error In Delete Controller: ${err.message}`);
    next(err);
  }
};

export {
  CDNController,
  userCDNController,
  UserAllImagesController,
  DeleteImageController,
};
