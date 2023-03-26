const multer = require("multer");
const path = require("path");
import db from "../models/index";
const { v4: uuidv4 } = require("uuid");

module.exports = async (req, res) => {
  try {
    const {
      title,
      prefix,
      notes,
      author_name,
      institution,
      country,
      author_email,
      phone,
      abstract,
      keywords,
    } = req.body;
    if (
      !title ||
      !prefix ||
      !notes ||
      !author_name ||
      !institution ||
      !country ||
      !author_email ||
      !phone ||
      !abstract ||
      !keywords ||
      !req.file
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required information" });
    }
    const fileNameUniqueId = uuidv4();
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads/");
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
          null,
          file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
        );
      },
      limits: {
        fileSize: 1048576 * parseInt(process.env.LIMITS_FILE_UPLOAD_MB),
      },
    });

    const upload = multer({
      storage: storage,
      fileFilter: function (req, file, cb) {
        const filetypes = /docx|pdf/;
        const extname = filetypes.test(
          path.extname(file.originalname).toLowerCase()
        );
        if (extname) {
          return cb(null, true);
        } else {
          cb("Error: Only .docx or .pdf files are allowed");
        }
      },
    }).single("paper");
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err });
      } else {
        const papers = await db.Paper.findAll({
          where: { user_id: req.user.id },
        });
        if (papers.length <= 20) {
          const paper = await db.Paper.create({
            path: req.file.filename,
            prefix,
            notes,
            author_name,
            institution,
            country,
            author_email,
            phone,
            abstract,
            keywords,
            user_id: req.user.id,
          });
          return res.status(201).json({ paper });
        } else {
          return res.status(400).json({
            message: "You have reached the maximum number of papers allowed",
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
