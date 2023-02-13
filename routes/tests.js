const { Test, validate } = require("../models/test");
const { Chapter } = require("../models/chapter");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const tests = await Test.find().populate('chapter')
    .select("-__v")
    .sort("name");
  res.send(tests);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const chapter = await Chapter.findById(req.body.chapterId);
  if (!chapter) return res.status(400).send("Invalid chapter.");

  const test = new Test({
    testNum: req.body.testNum,
    chapter: {
      _id: chapter._id,
      name: chapter.name,
      number: chapter.number
    },
    timelimit: req.body.timelimit
  });
  await test.save();

  res.send(test);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let chapter = null;
  if (req.body.chapterId !== "") {
    chapter = await Chapter.findById(req.body.chapterId);
    if (!chapter)
      return res.status(400).send("Invalid chapter.");
  }
  let data = {
    testNum: req.body.testNum,
    chapter: chapter,
    timelimit: req.body.timelimit
  }
  if(req.body.questions) data['questions'] = req.body.questions
  console.log(data)
  const test = await Test.findByIdAndUpdate(
    req.params.id,
    data,
    { new: true }
  );

  if (!test)
    return res.status(404).send("The test with the given ID was not found.");

  res.send(test);
});

router.delete("/:id", [auth], async (req, res) => {
  const test = await Test.findByIdAndRemove(req.params.id);

  if (!test)
    return res.status(404).send("The test with the given ID was not found.");

  res.send(test);
});

router.delete("/:testId/:questionId", [auth], async (req, res) => {
  let test = await Test.findById(req.params.testId);
  console.log("params", req.params.questionId)
  test.questions = test.questions.filter((obj) => {
    console.log(obj._id)
    return obj._id !=req.params.questionId
  })
  console.log(test.questions.length)
  test = await Test.findByIdAndUpdate(
    req.params.testId,
    test,
  )
  if (!test)
    return res.status(404).send("The test with the given ID was not found.");

  res.send(test);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const test = await Test.findById(req.params.id).populate('chapter').populate('comments').select("-__v");

  if (!test)
    return res.status(404).send("The test with the given ID was not found.");

  res.send(test);
});

module.exports = router;
