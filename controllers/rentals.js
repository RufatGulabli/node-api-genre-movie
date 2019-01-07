const { Rental, validateRental } = require('../model/rental');
const { Movie } = require('../model/movie');
const { Customer } = require('../model/customer');
const mongoose = require('mongoose');
const express = require('express');
const Fawn = require('fawn');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
    try {
        const rentals = await Rental.find().sort({ dateOut: -1 });
        return res.json(rentals);
    } catch (err) {
        return res.status(400).json(err.message);
    }
});

router.post('/', async (req, res) => {
    const { error } = validateRental(req.body);
    if (error) return res.status(404).json(error.details[0].message);

    const customer = await Customer.findOne({ _id: req.body.customerId });
    if (!customer) return res.status(404).json("Invalid customer");

    const movie = await Movie.findOne({ _id: req.body.movieId });
    if (!movie) return res.status(404).json("Invalid movie");

    if (movie.numberInStock === 0) return res.status(400).json("Movie is not in stock");

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    try {
        // rental = await rental.save();
        // movie.numberInStock--;
        // movie.save;

        /* Transaction => 2 Phase Commit implementation in MongoDB */
        try {

            await new Fawn.Task()
                .save('rentals', rental)
                .update('movies', {
                    _id: movie._id
                }, {
                        $inc: { numberInStock: -1 }
                    })
                .run();
                
            return res.json(rental);

        } catch (err) {
            res.status(500).json('Internal Server Error.');
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
});

module.exports = router;