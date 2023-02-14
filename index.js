const winston = require("winston");
const express = require("express");
const fileUpload = require('express-fileupload');
const config = require("config");
const app = express();

app.use(fileUpload());

require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
