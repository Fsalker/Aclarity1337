const mongodb = require("mongodb");
const { log } = require("../utils");

module.exports = async () => {
  try {
    const mongodbClient = await mongodb.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const dbName =
      process.env.NODE_ENV === "test" ? "alacrity1337-test" : "alacrity1337";
    return mongodbClient.db(dbName);
  } catch (e) {
    throw e;
  }
};
