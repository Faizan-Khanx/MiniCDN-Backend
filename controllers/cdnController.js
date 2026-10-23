const GuestCDNController = async (req, res, next) => {
  try {
    const file = req.file;
    console.log(req.file);
    console.log(req.body);
    return res
      .status(200)
      .json({
        message: "File Upload Sucessfull",
        filetype:file.mimetype,
        name: file.originalname,
        fileSize: `${(file.size / 1024).toFixed(2)} KB`
      });
  } catch (err) {
    console.log(`Error in GuestCDNController: ${err.message}`);
    next(err);
  }
};

export { GuestCDNController };
