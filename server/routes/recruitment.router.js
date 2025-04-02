const router = require("express").Router();
const recruitController = require("../controllers/recruitment.controller");

router.post("/recruit",recruitController);

module.exports = router;