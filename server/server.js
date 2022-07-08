const PORT = 8080;
const express = require("express");
const app = express();
const morgan = require('morgan');
const quotes = require('./api/routes/quotes')


app.use(morgan('dev'));

app.use("/quote", quotes);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error)
});

app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app