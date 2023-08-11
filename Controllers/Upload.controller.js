// eslint-disable-next-line import/no-extraneous-dependencies
/* eslint-disable operator-linebreak */
const cloudinary = require("cloudinary").v2;
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadImage = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    return cloudinary.uploader.upload(req.file.path, async (err, result) => {
      if (err) {
        console.error("Error uploading to Cloudinary:", err);
        return res.status(500).json({ message: "Error uploading file" });
      }
      const update = await prisma.user.update({
        where: {
          id,
        },
        data: {
          image_url: result.secure_url,
        },
      });

      return res.status(200).json({ message: "upload success", update });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadImage };
