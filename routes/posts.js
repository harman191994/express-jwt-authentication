const router = require('express').Router();
const verify = require('./verifyToken')

router.get('/posts', verify, async (req, res) => {
    /*res.json({posts:{title:'Private Data', 'Description':'This is private data only accessible after login JWT authentication'}});*/
    res.send(req.user);
}) 

module.exports = router;
