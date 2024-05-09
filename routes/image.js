const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/", upload.single("image"), async (req, res) => {
    try {
      const image_url = req.file.path;
      res.status(200).send({ image_url: image_url });
    } catch (e) {
      res.status(400).send({ msg: e.message });
    }
  });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const image_url = req.file.path;
    res.status(200).send({ image_url: image_url });
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

module.exports = router;
