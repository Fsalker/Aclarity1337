const express = require("express");
const { connect } = require("./database");
const routes = require("./routes");
const {
  handleError500,
  handleErrorInvalidBody,
  log,
  encrypt,
  decrypt,
} = require("./utils");
require("dotenv").config();

const PORT = process.env.BACKEND_PORT;

const runServer = async () => {
  try {
    const db = await connect();

    const app = express();
    app.locals = {
      ...app.locals,
      handleError500,
      handleErrorInvalidBody,
      encrypt,
      decrypt,
      log,
      db,
    };
    app.use(express.json());
    app.use(routes);
    app.listen(PORT);

    log(`Server is up and running @ port ${PORT}`);
  } catch (e) {
    log("An error occurred when trying to run the server:");
    log(e);
  }
};

runServer();
