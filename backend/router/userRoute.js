const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel.js");
const router = express.Router();
router.post("/", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const userAdded = await User.create({
      name: name,
      email: email,
      age: age,
    });
    res.status(201).json(userAdded);
  } catch (error) {
    console.log(error);
    res.send(400).json({ error: error.message });
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
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updateUser);
  } catch (error) {
    console.log(error);
    res.send(500).json({ error: error.message });
  }
});
module.exports = router;
