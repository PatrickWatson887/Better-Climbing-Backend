const express = require('express');
//const bodyParser = require('body-parser');
let routes = require("../routes/main-index");
let database = require("../src/database");

database.initDBConnection();

const app = express();

// works for now but might be a bit insecure
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Default body parser configurations
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.use(routes);


app.set('port', 8000);

app.listen(8000);

// Sorting out 404s
app.use(function(req, res, next) {
    res.status(404).send("Not found");
    next();
});

process.on("unhandledRejection", (reason, promise) => {
  console.warn("WARNING - Unhandled Promise rejection - ", reason, " - promise: -", promise);
});

module.exports = app;