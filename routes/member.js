
const { Router } = require('express')
const Test = require('../model/testModel')

const router = Router()


// get all
router.get('/', async(req, res) => {
    try{
        const testItem = await Test.find({})
        res.send(testItem)
    }catch(e){
        console.error(e)
    }
})


// create
router.post('/add', (req, res) => {
    try {
        const item = Test.create(req.body)
        res.send(item)
    }catch(e) {
        console.error(e)
    }

})

// read
router.get('/:id', async (req, res) => {

    try{
        const {id} = req.params
        const testItem = await Test.find({ _id: id })
        res.send(testItem)
    }catch(e) {
        console.error(e)
    }

})

// update
router.put('/update', async (req, res) => {
    try {
        const { chapter, timelimit } = req.body
        const testItem = await Test.updateOne({ chapter: chapter }, { timelimit: timelimit })
        res.send(testItem)
    }catch(e) {
        console.error(e)
    }
})

// delete 

router.delete('/delete', async(req, res) => {
    try {
        const { chapter } = req.body
        const testItem = await Test.deleteOne({ chapter: chapter })
    }catch(e) {
        console.error(e)
    }
})

module.exports = router;