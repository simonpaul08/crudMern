
const mongoose = require('mongoose')
require('dotenv').config()
const mongoURI = process.env.MONGO_URI


mongoose.set('strictQuery', false);
const connectToMongo = async () => {
    try {
        const conn = await mongoose.connect(mongoURI)
        console.log(conn.connection.host)
    } catch(error) {
        console.log(error)
    }

}

module.exports = connectToMongo
