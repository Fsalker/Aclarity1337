const log = require("./log");

module.exports = (err, res) => {
  res
    .status(500)
    .end("An unexpected error has occurred when handling your request...");
  log(err);
};
