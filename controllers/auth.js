const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const { User } = require('../model/user');
const Joi = require('joi');

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).json(error.details[0].message);
        let { email, password } = req.body;
        let user = await User.findOne({ email: email });
        if (!user) return res.status(400).json('Invalid email or password');
        await bcrypt.compare(password, user.password, (err, result) => {
            if (err) return res.status(400).json(err.message);
            if (!result) return res.status(400).json('Invalid email or password');
            const token = jwt.sign({ email: user.email, name: user.name }, config.get('jwtPrivateKey'));
            return res.json(token);
        });
    } catch (err) {
        res.status(500).json('Server Error');
    }
});

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(req, schema);
}

module.exports = router;