let express = require("express");
require("express-async-errors");
let routerTools = require("./router-tools");
let tags = require("../src/tags/tags");

let router = express.Router();

router.get("/tags", async (req, res) => {
    const coach = await tags.getAllItems();
    routerTools.respond(res, coach);
});

router.get("/tags/synonyms", async (req, res) => {
    const tagsSynonyms = await tags.getTagsWithSynonyms();
    routerTools.respond(res, tagsSynonyms);
});


module.exports = router;