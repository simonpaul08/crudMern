const mongoose = require('mongoose');
const { Schema } = mongoose

const questionSchema = new Schema({
    choice: [
        {
            choice1: {
                type: String,
                required: true
            }
        },
        {
            choice2: {
                type: String,
                required: true
            }
        },
        {
            choice3: {
                type: String,
                required: true
            }
        },
        {
            choice4: {
                type: String,
                required: true
            }
        },
    ],
    answer: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    audioPath: {
        type: String,
        require: true,
        default: null
    }
})

const CommentSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        }, 
        content: {
            type: String,
            required: true
        },
        comments: []
    }
)

const TestSchema = new Schema(
    {
        chapter: {
            type: Number,
            required: true
        },
        testNum: {
            type: Number,
            required: true
        },
        timelimit: {
            type: Number, //minutes
            default: 45
        },
        questions: [questionSchema],
        comments: [CommentSchema],
        createdAt: {
            type: Date,
            required: true,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            required: true,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('Test', TestSchema) 