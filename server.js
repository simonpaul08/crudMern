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
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))



app.listen(4000, () => { 
    console.log('listening on 4000')
})