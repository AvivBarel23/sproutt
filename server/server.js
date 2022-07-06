const PORT = 8080;
const express = require("express");
const app = express();
const calculations=require('./calculations')

app.get("/calc", (req, res) => {
    const term = req.query.term
    const coverage = req.query.coverage
    const age = req.query.age
    const height = req.query.height
    const weight = req.query.weight

    const healthClass = calculations.getHealthClass(height, weight)
    const factor = calculations.getFactor(healthClass, coverage, term, age)
    const price = coverage / 1000 * factor

    res.send({
        price:price.toString(),
        healthClass:healthClass,
        term:term,
        coverage:coverage
    })
});


app.listen(PORT,()=> console.log(`Server started on port ${PORT}`));

