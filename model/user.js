const mongoose = require('mongoose');
const validator = require('validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        validate: {
            validator: function (value) {
                validator.isAscii(value);
            },
            message: props => `${props} is not a valid phone number`
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255,
        validate: {
            validator: function(email){
                return validator.isEmail(email);
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('JWT'));
    return token;
}

const User = mongoose.model('User', userSchema);

function isValidUser(user){

    const schema = {
        name : Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required()
    }
    let generalError = Joi.validate(user, schema).error;
    let passwordError = Joi.validate(user.password, new PasswordComplexity()).error;
    return generalError || passwordError;
}

module.exports = {
    User: User,
    isValidUser: isValidUser
}

