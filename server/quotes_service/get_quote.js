const get_health_class = require("./get_health_class")
const get_factor =require("./get_factor")

const getQuote = (term, coverage, age, height, weight)=>{
    const healthClass = get_health_class.getHealthClass(height, weight)
    const factor = get_factor.getFactor(healthClass, coverage, term, age)
    const price = coverage / 1000 * factor
    return {
        price:price.toString(),
        healthClass:healthClass,
        term:term,
        coverage:coverage
    }
}

module.exports = {getQuote}