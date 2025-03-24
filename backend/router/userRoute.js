const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel.js");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with a timestamp to avoid name conflicts
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), async (req, res) => {
  const { name, email, age } = req.body;
  let image = null;
  if (req.file) {
    image = `http://localhost:5000/uploads/${req.file.filename}`; // URL of the uploaded image
  }
  try {
    const userAdded = await User.create({
      name: name,
      email: email,
      age: age,
      image: image,
    });
    res.status(201).json(userAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const showUser = await User.find();
    res.status(201).json(showUser);
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: error.message });
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await User.findById({ _id: id });
    res.status(201).json(singleUser);
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete({ _id: id });
    res.status(201).json(deleteUser);
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: error.message });
  }
});
router.put("/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  let image = req.body.image;

  if (req.file) {
    image = `http://localhost:5000/uploads/${req.file.filename}`;
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { name, email, age, image },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
