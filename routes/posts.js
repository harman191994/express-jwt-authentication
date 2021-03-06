const router = require('express').Router();
const verify = require('./verifyToken')

router.get('/posts', verify, async (req, res) => {
    /*res.json({posts:{title:'Private Data', 'Description':'This is private data only accessible after login JWT authentication'}});*/
    res.send(req.user);
}) 

router.get('/home', (req, res) => {
    res.render('home', { user : [{name: "Harman"},{name: "Jot"},{name:"Kaur"}]})
})
module.exports = router;
