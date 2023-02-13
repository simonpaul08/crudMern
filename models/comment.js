const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new mongoose.Schema({
    test: { type: Schema.Types.ObjectId, ref: 'Test' },
    parent: { type: Schema.Types.ObjectId, ref: 'Comment' },
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', commentSchema);

function validateComment(Comment) {
  const schema = {
    name: Joi.string().min(1).max(50).required(),
    email: Joi.string().min(1).max(50).required(),
    comment: Joi.string().required(),
    test: Joi.string().required(),
    parent: Joi.string().allow(null),
  };

  return Joi.validate(Comment, schema);
}

exports.commentSchema = commentSchema;
exports.Comment = Comment; 
exports.validate = validateComment;