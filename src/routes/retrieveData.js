module.exports = async (req, res) => {
  try {
    res.end("Hello world! /retrieveData");
  } catch (e) {
    req.app.locals.handleError500(e, res);
  }
};
