const express = require('express');
const router = express.Router();
const getQuote = require('../../quotes_service/get_quote')

router.get("/", (req, res) => {
    const {term, coverage, age, height, weight} = req.query
    const result = getQuote.getQuote(term, coverage, age, height, weight)
    res.status(200).send(result)
});

module.exports = router