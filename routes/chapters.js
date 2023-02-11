const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Chapter, validate } = require("../models/chapter");
const mongoose = require("mongoose");
const express = require("express");
const { Test } = require("../models/test");
const router = express.Router();

router.get("/", async (req, res) => {
  const chapters = await Chapter.find()
    .select("-__v")
    .sort({isExam: 1, number: 1});
  res.send(chapters);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let chapter = new Chapter({ name: req.body.name, number: req.body.number });
  chapter = await chapter.save();

  res.send(chapter);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const chapter = await Chapter.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { number: req.body.number },
    {
      new: true
    }
  );

  if (!chapter)
    return res.status(404).send("The chapter with the given ID was not found.");

  res.send(chapter);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const chapter = await Chapter.findByIdAndRemove(req.params.id);

  if (!chapter)
    return res.status(404).send("The chapter with the given ID was not found.");

  res.send(chapter);
});

router.get("/withTests", async (req, res) => {
  const chapters = await Chapter.find().populate('tests')
    .select("-__v")
    .sort({isExam: 1, number: 1})
    
  res.send(chapters);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const chapter = await Chapter.findById(req.params.id).select("-__v");
  const tests = await Test.find({chapter: chapter});
  if (!chapter)
    return res.status(404).send("The chapter with the given ID was not found.");

  res.send({...chapter._doc, tests:tests});
});

module.exports = router;
