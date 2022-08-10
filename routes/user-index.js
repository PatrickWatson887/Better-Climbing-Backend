let express = require("express");
let router = express.Router();
let routerUtils = require("./router-tools");


router.post("/user/login", async (req, res) => {
   console.log(req);
   let username = routerUtils.getRequiredProperty(req.body, "username", "string");
   let password = routerUtils.getRequiredProperty(req.body, "password", "string");

   //ACTUAL CODE TO LOGIN HERE

   routerUtils.respond(res, "user logged in");
});


router.post("/user/logout", async (req, res) => {
   console.log(req);
   let username = routerUtils.getRequiredProperty(req.body, "username", "string");

   //ACTUAL CODE TO LOGOUT HERE

   routerUtils.respond(res, "user logged out");
});

router.get("/user/list", async (req, res) => {
   console.log(req);

   let allUsers;
   //CODE TO CONTACT THE DB AND LIST ALL USERS

   routerUtils.respond(res, allUsers);
});

router.get("/user/get", async (req, res) => {

   let username = routerUtils.getRequiredProperty(req.body, "username", "string");

   let user;
   //CODE TO CONTACT THE DB AND GET A SPECIFIC USER

   routerUtils.respond(res, user);
});

router.post("/user/update", async (req, res) => {

   let username = routerUtils.getRequiredProperty(req.body, "username", "string");

   let updateObj;

   //CODE TO SEND UPDATEOBJ AND CONFIRM UPDATE

   routerUtils.respond(res, {success: true});

});

router.post("/user/delete", async (req, res) => {

   let username = routerUtils.getRequiredProperty(req.body, "username", "string");
   //CODE TO SEND UPDATEOBJ AND CONFIRM DELETION

   routerUtils.respond(res, {success: true});
});

/* TO ADD:
- FORGOTTEN PASSWORD
- INCORPORATE JWT SECRETS FOR SECURE SESSIONS
- ADD RELEVANT KEY MANAGEMENT ENDPOINTS FOR JWT SECRETS
 */
module.exports = router;