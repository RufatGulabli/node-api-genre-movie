
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const authorization = require('../middleware/auth');
const _ = require('lodash');
const { User, isValidUser } = require('../model/user');

const router = express.Router();

router.get('/me', authorization, async (req, res) => {
    try {
        const user = await User.findById({ _id: req.user._id }).select('-password');
        return res.json(user);
    } catch (exc){
        return res.status(500).json("Internal Error");
    }
});


router.post('/', async (req, res) => {
    try {
        const error = isValidUser(req.body);
        if (error) return res.status(404).json(error.details[0].message);

        let { name, email, password } = req.body;
        
        await bcrypt.hash(password, null, null, function (err, result) {
            if (err) throw new Error("Can't encrypt the password");
            password = result;
        });
        let user = await User.findOne({ email: email });
        if (user) return res.status(400).json("User already exists");

        user = new User({
            name: name,
            email: email,
            password: password
        });
        await user.save();

        let token = user.generateAuthToken();
        res.header('x-auth-token', token).json(_.pick(user, ['_id', 'name', 'email']));

    } catch (err) {
        res.status(500).json("Internal Error");
    }
});

module.exports = router;