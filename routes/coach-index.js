let express = require("express");
require("express-async-errors");
let enums = require("../src/enumerations");
let routerTools = require("./router-tools");
let coaches = require("../src/coach/coach");
let s3Interactions = require("../utilities/aws/s3/s3-interactions");
let fs = require("fs");
let uuidv4 = require("uuid/v4");
let utils = require("../src/utils");

let router = express.Router();

router.post("/coach/create", async  (req, res) => {
  let name = routerTools.getRequiredProperty(req.body, enums.CoachTable.NAME, "string");
  let profilePicUrl = routerTools.getOptionalProperty(req.body, enums.CoachTable.PROFILE_PIC_URL, "string");
  let rating = routerTools.getOptionalProperty(req.body, enums.CoachTable.RATING, "number");
  let tags = routerTools.getOptionalProperty(req.body, enums.ApiDataTypes.TAGS, "array");
  let location = routerTools.getOptionalProperty(req.body, enums.CoachTable.LOCATION, "string");
  let description = routerTools.getOptionalProperty(req.body, enums.CoachTable.DESCRIPTION, "string");
  let summary = routerTools.getOptionalProperty(req.body, enums.CoachTable.SUMMARY, "number");
  let phoneNumber = routerTools.getOptionalProperty(req.body, enums.CoachTable.PHONE_NUMBER, "string");
  let emailAddress = routerTools.getOptionalProperty(req.body, enums.CoachTable.EMAIL_ADDRESS, "string");

  let response = await coaches.createCoach(name, profilePicUrl, rating, tags, location, description, summary, phoneNumber, emailAddress);
  // Currently this doesn't actually properly handle "Couldn't create user or user already exists" errors, fix it dumbass
  routerTools.respond(res, {success: `Coach ${name} with ID: ${response.rows[0].id} created successfully`});
});

router.get("/coach/get", async (req, res) => {
  let coachID = routerTools.getRequiredProperty(req.query, enums.CoachTable.PRIMARY_KEY);
  if (coachID == null) {
    throw {error: "You must specify a Coach ID"};
  } else {
    const coach = await coaches.getCoach(coachID);
    routerTools.respond(res, coach);
  }
});

router.get("/coach/testS3Upload", async (req, res) => {
  let fileName = "wallpaper.jpg";
  let file = fs.createReadStream(`${process.cwd()}/test/${fileName}`);
  let name = uuidv4();
  await s3Interactions.storeObject(enums.S3BucketNames.COACHES, ["1", "2", "3"], name, file, utils.getFileType(fileName));
  let url = await s3Interactions.getTemporaryURL(enums.S3BucketNames.COACHES,  ["1", "2", "3"], name);
  routerTools.respond(res, { URL: url });
});

router.get("/coach/testS3Delete", async (req, res) => {
  let key = routerTools.getRequiredProperty(req.body, "file", "string")
  await s3Interactions.deleteObject(enums.S3BucketNames.COACHES, key);
});

router.get("/coach/getAll", async (req, res) => {
  const coach = await coaches.getAllCoaches();
  routerTools.respond(res, coach);
});

router.get("/coach/getAllWithTags", async (req, res) => {
  const coach = await coaches.getCoachesWithTags();
  routerTools.respond(res, coach);
});

router.get("/coach/featured", async (req, res) => {
  const coach = await coaches.getFeaturedCoaches();
  routerTools.respond(res, coach);
});

router.get("/coach/items", async (req, res) => {
  let coachID = routerTools.getRequiredProperty(req.query, enums.Coac.PRIMARY_KEY);
  if (coachID == null) {
    throw {error: "You must specify a Coach ID"};
  } else {
    const coach = await coaches.getCoachesItems(coachID);
    routerTools.respond(res, coach);
  }});

router.post("/coach/update", async (req, res) => {

});


router.post("/coach/delete", async (req, res) => {

});

module.exports = router;