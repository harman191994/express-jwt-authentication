const router = require('express').Router();
const User = require('../models/User.js');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation.js');

//User registration
router.post('/register', async (req, res) => {
    //Lets validate the DATA before we make a user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the user already exists in the DB
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exist.");

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashpassword
    })
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

//User Login
router.post('/login', async (req, res) => {
    //Lets validate the user data before login
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the user exists in the DB
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("User not found");

    //Password is correct?
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send("Invalid Password");

    //Create and assign a token
    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token);
    //res.send("Logged in!")
})

router.get('/getUser', async (req, res) => {
    //console.log('get users')
    const getUserFromDB = await User.find();
    res.send(getUserFromDB);
})
router.delete('/deleteUser/:id', async (req, res) => {
    //console.log('remove user')
    const removeUserFromDB = await User.remove({ "password": req.params.id });
    res.send(removeUserFromDB);
})

module.exports = router;
