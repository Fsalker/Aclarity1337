module.exports = async (req, res) => {
  try {
    const { id, decryption_key } = req.body;
    const { db } = req.app.locals;

    if (id === undefined || decryption_key === undefined) {
      return req.app.locals.handleErrorInvalidBody(res);
    }

    let encryptedValues;
    const isWildcardQuery = id.length > 0 && id.slice(-1) === "*";
    if (isWildcardQuery) {
      const idPrefix = id.slice(0, -1);
      const regex = new RegExp(`^${idPrefix}.*`);
      encryptedValues = await (
        await db
          .collection("aclarity1337")
          .find({ id: { $regex: `^${idPrefix}` } })
      ).toArray();
    } else {
      encryptedValues = await (
        await db.collection("aclarity1337").find({ id })
      ).toArray();
    }

    const decryptedValues = encryptedValues.map((data) => {
      try {
        const decryptedValue = req.app.locals.decrypt(
          data.value,
          decryption_key
        );

        return { id, value: JSON.parse(decryptedValue) };
      } catch (e) {
        // Decryption failed due to an invalid key
        req.app.locals.log(
          `Data with ID "${data.id}" could not be decrypted with decryption key "${decryption_key}"`
        );
        // req.app.locals.log(e);
        return null;
      }
    });

    const succesfullyDecryptedValues = decryptedValues.filter(
      (value) => value !== null
    );
    res.json(succesfullyDecryptedValues);
  } catch (e) {
    req.app.locals.handleError500(e, res);
  }
};
