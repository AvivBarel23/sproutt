const find_health_class = require("./find_health_class")
const find_factor =require("./find_factor")

const getQuote = (term, coverage, age, height, weight)=>{
    const healthClass = find_health_class.getHealthClass(height, weight)
    const factor = find_factor.getFactor(healthClass, coverage, term, age)
    const price = coverage / 1000 * factor
    return {
        price:price.toString(),
        healthClass:healthClass,
        term:term,
        coverage:coverage
    }
}

module.exports = {getQuote}