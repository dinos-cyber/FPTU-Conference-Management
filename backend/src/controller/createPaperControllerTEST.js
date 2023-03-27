const multer = require("multer");
const path = require("path");
import db from "../models/index";
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + uuidv4() + path.extname(file.originalname));
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

module.exports = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err });
      } else {
        if (!req.file) {
          return res.status(400).json({ message: "No file upload found!" });
        }
        const papers = await db.Paper.findAll({
          where: { user_id: req.user.id },
        });
        if (papers.length <= 20) {
          const paper = await db.Paper.update(
            {
              path: req.file.filename,
            },
            { where: { id: req.params.id } }
          );
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
