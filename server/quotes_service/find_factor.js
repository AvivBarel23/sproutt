const xlsx = require("xlsx")
const path = require("path")

const rates_table_file = xlsx.readFile(path.resolve(__dirname, 'rates_table.xlsx'))
const rate_table_sheets_list = rates_table_file.SheetNames;
const rates_table_json = xlsx.utils.sheet_to_json(rates_table_file.Sheets[rate_table_sheets_list[0]])
const rates_table = {"100-249": {}, "250-499": {}, "500-999": {}}
const rates_table_dictionary = Object.keys(rates_table_json[0]).map((key) => rates_table_json[0][key])
const rates_table_array = Object.values(rates_table_json).slice(1)

const set_health_class = (coverage, key, list) => {
    rates_table[coverage][key] = {}
    for (let i = 0; i < 4; i++) {
        rates_table[coverage][key][rates_table_dictionary[i + 2]] = list[i]
    }
}
const set_health_classes = (key, r1, r2, r3) => {
    set_health_class("100-249", key, r1);
    set_health_class("250-499", key, r2);
    set_health_class("500-999", key, r3)
}

rates_table_array
    .map(row => Object.keys(row)
        .map((key) => row[key]))
    .map(row => set_health_classes(row[0] + "," + row[1], row.slice(2, 6), row.slice(6, 10), row.slice(10)))



const getFactor = (healthClass, coverage, term, age) => {
    const coverage_class = coverage >= 100000 && coverage <= 249000 ?
        "100-249" : coverage >= 250000 && coverage <= 499000 ? "250-499" : "500-999"
    return rates_table[coverage_class][term + "," + age][healthClass]
}

module.exports = {getFactor}