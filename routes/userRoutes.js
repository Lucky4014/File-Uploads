const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const User = require("../models/User");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.diskStorage({});

const upload = multer({
  storage
});


router.post("/upload", upload.single("image"), async (req, res) => {
  try {

    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "profile-images"
      }
    );

    const user = new User({
      name: req.body.name,
      imageUrl: result.secure_url
    });

    await user.save();

    res.status(200).json({
      message: "Image Uploaded Successfully",
      imageUrl: result.secure_url
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;
