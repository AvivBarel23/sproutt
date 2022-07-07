const health_class_calcs = require("./health_class_calcs")
const rates_table_calcs =require("./rates_table_calcs")

const calcPrice = (term,coverage,age,height,weight)=>{
    const healthClass = health_class_calcs.getHealthClass(height, weight)
    const factor = rates_table_calcs.getFactor(healthClass, coverage, term, age)
    const price = coverage / 1000 * factor
    return {
        price:price.toString(),
        healthClass:healthClass,
        term:term,
        coverage:coverage
    }
}

module.exports = {calcPrice}