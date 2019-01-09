const express = require('express');
const { Customer, isValidCustomer } = require('../model/customer');

const router = express.Router();


/*============================ HTTP Methods ====================================*/
router.get('/', async (req, res, next) => {
    try {
        const customers = await Customer.find().sort({ name: 1 });
        return res.json(customers);
    } catch (exc) {
        next(exc);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.json(`Customer with ID=${req.params.id} not found`)
        return res.json(customer);
    } catch (exc) {
        next(exc);
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
        await customer.save();
        return res.json(customer);
    } catch (exc) {
        next(exc);
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
    } catch (exc) {
        next(exc);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Customer.findOneAndDelete({ _id: req.params.id });
        return res.json(result);
    } catch (exc) {
        next(exc);
    }
});

module.exports = router;