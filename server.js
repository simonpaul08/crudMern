const express = require('express')
const mongo = require('./db')
const app = express()

mongo()
const cors = require('cors')

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));


app.use(express.json())

// routes 
app.use('/api/members', require('./routes/member'))



app.listen(4000, () => {
    console.log('listening on 4000')
})