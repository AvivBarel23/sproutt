const xlsx = require("xlsx")
const path = require("path")

const health_class_file = xlsx.readFile(path.resolve(__dirname, 'health_class.xlsx'))
const health_class_file_sheets_list = health_class_file.SheetNames;
const health_class_table_json = xlsx.utils.sheet_to_json(health_class_file.Sheets[health_class_file_sheets_list[0]])
const health_class_dictionary = Object.keys(health_class_table_json[1]).map((key) => health_class_table_json[1][key])
const health_class_array = Object.values(health_class_table_json).slice(3)
const health_class_table = {}
health_class_array.map(row => Object.keys(row)
    .map((key) => row[key]))
    .map(row => health_class_table[[row[0] + row[1]]] = row.slice(2))

const getHealthClass = (height, weight) => {
    const height_list = height.split(" ")
    const feet = height_list[0];
    const inches = height_list[2];
    const height_string = feet + '\'' + inches + '"'
    const row = health_class_table[height_string];
    if (row[0] >= weight) {
        return health_class_dictionary[0]
    } else if (row[4] <= weight) {
        return health_class_dictionary[4]
    }
    for (let i = 0; i < 3; i++) {
        if (row[i] <= weight && weight <= row[i + 1]) {
            return health_class_dictionary[i]
        }
    }
}

module.exports = {getHealthClass}