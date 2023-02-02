
const { Router } = require('express')

const router = Router()

const members = [
    {
        name: "Max",
        id: 22
    }, 
    {
        name: 'Alex',
        id: 28
    }
]

router.get('/', (req, res) => {
    res.send(members)
})

// create
router.post('/add', (req, res) => {
    const item = req.body
    members.push(item)
    res.send(members)
})

// read
router.post('/:id', (req, res) => {
    const {id} = req.params
    const memb = members.find(m => m.id === parseInt(id))
    if(memb){
        res.send(memb);
    }else {
        res.send('member not available in the db');
    }
})

// update
router.put('/update', (req, res) => {
    const { id } = req.body
    const memb = members.find(m => m.id === id)

    if(memb){
        memb.name = req.body.name
        res.send(memb)
    }else {
        res.send('member not available in the db')
    }
})

// delete 

module.exports = router;