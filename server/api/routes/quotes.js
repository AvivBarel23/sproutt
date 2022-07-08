const express = require('express');
const router = express.Router();
const calculations = require('../../quotes_service/get_quote')

router.get("/", (req, res) => {
    const {term, coverage, age, height, weight} = req.query
    const result = calculations.getQuote(term, coverage, age, height, weight)
    res.status(200).send(result)
});

module.exports = router