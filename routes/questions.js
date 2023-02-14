const { Test, validateQuestion } = require("../models/test");
var path = require('path');
const { Chapter } = require("../models/chapter");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const express = require("express");
const { route } = require("./comments");
const { uniqueId } = require("lodash");
const router = express.Router();

router.post("/upload", async (req, res) => {
  let path = uniqueId() + req.files.file.name;
  let uploadPath = __dirname + "/../uploads/audio/" + path;
  // Use the mv() method to place the file somewhere on your server
  req.files.file.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);
  });
  res.send("/audio/" + path);
})

router.get("/audio/:audioPath", async (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../uploads/audio/" + req.params.audioPath));
})

router.post("/:testId/:questionId", async (req, res) => {
  const { error } = validateQuestion(req.body);
  let question = { ...req.body }
  let oldQuestion
  if (error) return res.status(400).send(error.details[0].message);

  let test = await Test.findById(req.params.testId).select("-__v");

  if(req.params.questionId!="new"){
    oldQuestion = test.questions.find(q => q._id==req.params.questionId)
    if(!oldQuestion) return res.status(400).send("Invalid question id.");
  }

  if(req.params.questionId=='new')
    test.questions.push(question)
  else {
    let i = test.questions.findIndex(q=>q._id==req.params.questionId)
    if(question.audioPath=="") question.audioPath = oldQuestion.audioPath
    test.questions[i] = question
  }

  await test.save()
  res.send(test);
});

router.delete("/:testId/:questionId", async (req, res) => {
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

module.exports = router;
