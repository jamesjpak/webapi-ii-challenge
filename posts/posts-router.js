const db = require('../data/db');

const router = require('express').Router();

router.get('/', async (req, res) => {
try {
const posts = await db.find(req.query)
res.status(200).json(posts)
} catch (error) {
res.status(500).json({ error: "The posts information could not be retrieved." })
}
})


router.post('/', async (req, res) => {
   
    try {
        const {title, contents} = req.body

        const post = await db.insert(req.body);

        if (!title || !contents) 
        {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        } 
        else 
        {
           db
           .insert({title, contents})
           .then(post => {
               res.status(201).json(post)
           })
        } 
        catch (error) 
        {
            res.status(500).json({
                error: "There was an error while saving the post to the database"
            })
        }
    }
})


module.exports = router;