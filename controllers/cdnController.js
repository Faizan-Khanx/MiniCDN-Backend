import { CDNService, userCDN} from "../services/cdnService.js";


const userCDNController =  async (req, res, next) => {
  try {
    const file = req.file;
    console.log(req.file);
    console.log(req.body);
    const CDN = await userCDN(file, req.user.id)
    return res
      .status(200)
      .json({
        message: "File Upload Sucessfull",
        filetype:file.mimetype,
        originalSize:`${(CDN.originalSize / 1024).toFixed(2)} KB`,
        compressedSize:`${(CDN.compressedSize / 1024).toFixed(2)} KB`,
        savingPercentage:`${CDN.savingspercent} %`,
        url:`${req.protocol}://${req.get("host")}/${CDN.url}`,

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
    const CDN = await CDNService(file)
    return res
      .status(200)
      .json({
        message: "File Upload Sucessfull",
        filetype:file.mimetype,
        originalSize:`${(CDN.originalSize / 1024).toFixed(2)} KB`,
        compressedSize:`${(CDN.compressedSize / 1024).toFixed(2)} KB`,
        savingPercentage:`${CDN.savingsPercent} %`,
        url:`${req.protocol}://${req.get("host")}/uploads/${CDN.fileName}`,

      });
  } catch (err) {
    console.log(`Error in GuestCDNController: ${err.message}`);
    next(err);
  }
};

export { CDNController, userCDNController };
