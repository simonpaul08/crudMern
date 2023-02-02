
const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://pawan:mint@cluster0.lbmywk1.mongodb.net/?retryWrites=true&w=majority'

mongoose.set('strictQuery', false);
const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log('connected to mongodb')
    })
}

module.exports = connectToMongo
