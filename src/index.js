const express = require("express");
const { connect } = require("./database");
const routes = require("./routes");
const { handleError500, log } = require("./utils");
require("dotenv").config();

const PORT = process.env.BACKEND_PORT;

const runServer = async () => {
  try {
    const dbClient = await connect();

    const app = express();
    app.locals.handleError500 = handleError500;
    app.use(express.json());
    app.use(routes);
    app.listen(PORT);

    log(`Server is up and running @ port ${PORT}`);
  } catch (e) {
    log("An error occurred when trying to run the server...\n");
    log(e);
  }
};

runServer();
