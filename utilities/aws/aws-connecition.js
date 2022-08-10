let AWS = require("aws-sdk");
let fs = require("fs");
let enums = require("../../src/enumerations");

const AWS_CREDENTIALS_FILE = enums.HOME_DIRECTORY + "/.aws/credentials";

let REGION = enums.AWS_REGION;
let USING_ENV_VARS = !!enums.AWS_ACCESS_KEY_ID;

// If profile is null it will connect to the AWS profile marked "default"
function configureAWSDetails(profile = null) {
  checkForCredentials();
  if (!USING_ENV_VARS) {
    if (profile == null) {
      profile = enums.AWS_PROFILE;
    }
    AWS.config.credentials = new AWS.SharedIniFileCredentials({profile})
  }
  AWS.config.update({
    region: REGION
  });
}

function checkForCredentials() {
  if (USING_ENV_VARS) {
    if (!enums.AWS_ACCESS_KEY_ID || !enums.AWS_SECRET_ACCESS_KEY) {
      console.log("ERROR - Environment variables for AWS Connection keys not available.");
      return false;
    }
  } else if (!fs.existsSync(AWS_CREDENTIALS_FILE)) { // using ~/.aws/credentials file
    console.log(`ERROR - AWS credentials file (${AWS_CREDENTIALS_FILE}) not available.`);
    return false;
  }
  return true;
}

module.exports.getInstance = (profile = null) => {
  if (checkForCredentials()) {
    configureAWSDetails(profile);
  }
  return AWS;
}


