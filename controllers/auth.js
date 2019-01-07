const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const User = require('User');
const Joi = require('joi');

const router = express.Router();


router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).json(error.details[0].message);
    let { email, password } = req.body;
    let user = await User.find({ email: email });
    if(!user) return res.status(400).json(error.details[0].message);
    
});

function validate(req){
    const schema = {
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user, schema);
}

module.exports = router;