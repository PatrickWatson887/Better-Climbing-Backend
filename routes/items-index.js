let express = require("express");
require("express-async-errors");
let routerTools = require("./router-tools");
let items = require("../src/items/items");

let router = express.Router();

router.get("/items", async (req, res) => {
    const coach = await items.getAllItems();
    routerTools.respond(res, coach);
});

router.get("/items/:coachId", async (req, res) => {
    let coachID = req.params.coachId
    if (coachID == null) {
      throw {error: "You must specify a Coach ID"};
    } else {
      const coach = await items.getCoachesItems(coachID);
      routerTools.respond(res, coach);
}});


module.exports = router;