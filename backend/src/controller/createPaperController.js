const multer = require("multer");
const path = require("path");
import db from "../models/index";
const { v4: uuidv4 } = require("uuid");

module.exports = async (req, res) => {
  try {
    console.log(req.body);
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
      !keywords
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required information" });
    }
    const papers = await db.Paper.findAll({ where: { user_id: req.user.id } });
    console.log(papers);
    if (papers.length <= 20) {
      const paper = await db.Paper.create(
        {
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
          path: uuidv4(),
          user_id: req.user.id,
        },
        { where: { user_id: req.user.id } }
      );
      return res.status(201).json({ paper });
    } else {
      return res.status(400).json({
        message: "You have reached the maximum number of papers allowed",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
