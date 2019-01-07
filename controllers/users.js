const express = require('express');
const _ = require('lodash');
const { User, isValidUser } = require('../model/user');

const router = express.Router();

router.post('/', async(req, res) => {
    try {
        const { error } = isValidUser(req.body);
        if (error) return res.status(404).send(error.details[0].message);

        const { name, email, password } = req.body;

        let user = await User.findOne({ email : email });
        if(user) return res.status(400).json("User already exists");

        user = new User({
            name : name,
            email: email,
            password: password
        });
        await user.save();
        res.json(_.pick(user, ['name', 'email']));

    } catch (err) {
        res.status(500).json("Internal Error");
    }
});

module.exports = router;