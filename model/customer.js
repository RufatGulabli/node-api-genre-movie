const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    phone: {
        type: String,
        required: [true, 'User phone number is required'],
        unique: true,
        validate: {
            validator: function (value) {
                return /[0-9]{14}/.test(value);
            },
            message: props => `${props} is not a valid phone number`
        }
    }
}));

function isValidInput(customer) {
    const schema = {
        isGold: Joi.boolean().required(),
        name: Joi.string().min(3).max(30).required(),
        phone: Joi.string().required().regex(/[0-9]{14}/)
    };
    return Joi.validate(customer, schema);
}

module.exports = {
    Customer: Customer,
    isValidCustomer: isValidInput
};