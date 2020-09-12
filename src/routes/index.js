const express = require("express");
const router = express.Router();

const retrieveData = require("./retrieveData");
const storeData = require("./storeData");

router.post("/retrieveData", retrieveData);
router.post("/storeData", storeData);

module.exports = router;
