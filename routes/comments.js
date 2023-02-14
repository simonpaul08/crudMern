const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Comment, validate } = require("../models/comment");
const { Test } = require("../models/test")
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/:testId", async (req, response) => {
    const comments = await Comment.find({test: req.params.testId})
        .select("-__v")
        .sort("createAt");

    let tree = [], arrayDictionary = {};
    
    // First map the nodes of the array to an object/dictionary where the key is their id
    comments.forEach((cat) => {
      arrayDictionary[cat._id] = cat._doc;
      arrayDictionary[cat._id]["children"] = [];
    });
    
    
    // for each entry in the dictionary
    for (var entry in arrayDictionary) {

      // get all the data for this entry in the dictionary
      const mappedElem = arrayDictionary[entry];

      // if the element has a parent, add it
      if (
        mappedElem.parent && // the dictionary has a parent
        arrayDictionary[mappedElem["parent"]] // and that parent exists
        ) {

        arrayDictionary[mappedElem["parent"]]["children"].push(mappedElem);
      }
      // else is at the root level (parent = null or 0)
      else {
        tree.push(mappedElem);
      }
    }

    console.log(tree);
    response.send(tree);
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let comment = new Comment(req.body);
    comment = await comment.save();

    test = await Test.findById(req.body.test);
    test.comments.push(comment);
    test.save();

    res.send(comment);
});

module.exports = router;

