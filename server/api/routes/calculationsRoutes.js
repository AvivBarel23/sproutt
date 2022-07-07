const express = require('express');
const router = express.Router();
const calculations = require('../../calculations/price_calculations')

router.get("/", (req, res, next) => {
    const {term, coverage, age, height, weight} = req.query
    const result = calculations.calcPrice(term, coverage, age, height, weight)
    res.status(200).send(result)
});

module.exports = router