import multer from "multer";

const limit = 50 * 1024 * 1024;
const storage = multer.memoryStorage();

const GuestCDNMiddleware = multer({
  storage: storage,
  limits: { fileSize: limit },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only Images and Videos Are Allowed"), false);
    }
  },
});

const validateFileUpload = (req, res, next) => {
  if (!req.file) {
    console.log(" Validation Failed: No file provided in request");
    return res
      .status(400)
      .json({ message: "File is required! Please select a file." });
  }

  console.log(`Validation Passed: File ${req.file.originalname} is present`);
  next();
};


const GuestCDNUpload = GuestCDNMiddleware.single("file");
export { GuestCDNUpload, validateFileUpload };
