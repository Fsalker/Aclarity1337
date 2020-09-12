module.exports = async (req, res) => {
  try {
    const { id, encryption_key, value } = req.body;
    const { db } = req.app.locals;

    if (
      id === undefined ||
      encryption_key === undefined ||
      value === undefined
    ) {
      return req.app.locals.handleErrorInvalidBody(res);
    }

    const encryptedValue = req.app.locals.encrypt(
      JSON.stringify(value),
      encryption_key
    );

    await db.collection("aclarity1337").deleteMany({ id });
    await db
      .collection("aclarity1337")
      .insertOne({ id, value: encryptedValue });
    res.end(`Encrypted Value: ${encryptedValue}`);
  } catch (e) {
    req.app.locals.handleError500(e, res);
  }
};
