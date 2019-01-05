const express = require('express');
const mongoose = require('mongoose');
const { Customer, isValidCustomer } = require('../model/customer');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/hometask', { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.log(err.message));

const router = express.Router();
router.use(bodyParser.json());


/*============================ HTTP Methods ====================================*/
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find().sort({ name: 1 });
        return res.json(customers);
    } catch (err) {
        return res.status(404).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.json(`Customer with ID=${req.params.id} not found`)
        return res.json(customer);
    } catch (err) {
        return res.status(404).json(`Genre with ID=${req.params.id} not found`);
    }
});

router.post('/', async (req, res) => {
    const { error } = isValidCustomer(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    let { isGold, name, phone } = req.body;

    const customer = new Customer({
        isGold: isGold,
        name: name,
        phone: phone
    });
    try {
        const result = await customer.save();
        return res.json(result);
    } catch (err) {
        return res.json(err);
    }
});

router.put('/:id', async (req, res) => {
    const { error } = isValidCustomer(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    let { isGold, name, phone } = req.body;

    try {
        const customer = await Customer.findOneAndUpdate({ _id: req.params.id }, {
            isGold: isGold,
            name: name,
            phone: phone
        }, { new: true });
        return res.json(customer);
    } catch (err) {
        return res.status(404).json({
            errCode: 1,
            message: `Customer with the ID=${req.params.id} not found.`
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Customer.findOneAndDelete({ _id: req.params.id });
        return res.json(result);
    } catch (err) {
        return res.status(404).json({
            errCode: 1,
            message: err
        });
    }
});

module.exports = router;