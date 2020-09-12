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

const jestIsRunning = process.env.NODE_ENV === "test";

const runServer = async () => {
  try {
    const db = await connect();
    const port = jestIsRunning
      ? process.env.BACKEND_TESTING_PORT
      : process.env.BACKEND_PORT;

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
    app.listen(port);

    log(`Server is up and running @ port ${port}`);

    return app;
  } catch (e) {
    log("An error occurred when trying to run the server:");
    log(e);
  }
};

if (!jestIsRunning) {
  runServer();
}

module.exports = runServer;
