module.exports = async (req, res) => {
  try {
    throw new Error("Son of a brain");
    res.end("Hello world! /storeData");
  } catch (e) {
    req.app.locals.handleError500(e, res);
  }
};
