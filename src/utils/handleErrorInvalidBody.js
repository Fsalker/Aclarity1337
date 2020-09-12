const log = require("./log");

module.exports = (res) => {
  res
    .status(400)
    .end(
      "Invalid request body. Check the API route's specifications and make sure you provided all required values."
    );
};
