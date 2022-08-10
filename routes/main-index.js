let express = require("express");
let router = express.Router();

//router.use(require("./user-index"));
router.use(require("./coach-index"));
router.use(require("./items-index"));
router.use(require("./tags-index"));
//router.use(require("./wall-index"));

module.exports = router;