const fs = require("fs");
const path = require("path");
const logFile = fs.createWriteStream(
  path.join(__dirname, "../../logs/log.txt"),
  {
    flags: "a",
  }
);

module.exports = (msg) => {
  // TODO [Improvement]: use momentJs and print a prettier time than just the unix timestamp
  const loggedMsg = `[${new Date().getTime()}] ${msg}`;
  logFile.write(`${loggedMsg}\n`);
  console.log(msg); // "msg" also logs the errors' stack
};
