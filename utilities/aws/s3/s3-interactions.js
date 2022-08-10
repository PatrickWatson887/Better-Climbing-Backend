let awsConfig = require("../aws-connecition");
let enums = require("../../../src/enumerations");

let S3_AVAILABLE = false;
let s3Instance = null;


async function init() {
  let AWS = awsConfig.getInstance();
  s3Instance = new AWS.S3({endpoint: `https://s3.${enums.AWS_REGION}.amazonaws.com`});
  S3_AVAILABLE = true;
}

init().catch(() => {
  console.log("Failed to init S3");
});

// If pathPrefix variable is an array, it will connect the index values to form a valid file path
function generateS3FilePath(pathPrefix, key) {
  if (typeof pathPrefix !== "string") {
    let path = "";
    for (let folder of pathPrefix) {
      path += folder + "/";
    }
    return path + key;
  } else {
    return pathPrefix + "/" + key;
  }
}

module.exports.storeObject = async (bucketName, pathPrefix, key, file, type= "binary/octet-stream") => {
  if (!S3_AVAILABLE) {
    console.log("ERROR - S3 has not been initialized");
    return;
  }
  const filePath = generateS3FilePath(pathPrefix, key);
  const params = {
    Key: filePath,
    Bucket: bucketName,
    Type: type,
    Body: file,
    ServerSideEncryption: "AES256",
  };

  await s3Instance.upload(params, (err, data) => {
      if (err) {
        console.log(`ERROR - Could not upload ${filePath} to ${bucketName}. \n Details: ${err}`);
        return `ERROR - Could not upload ${filePath} to ${bucketName}`;
      } else {
        console.log(`File uploaded successfully to ${data.Location}`);
        return `File uploaded successfully to ${data.Location}`
      }
  });
}

module.exports.deleteObject = async (bucketName, pathToObject) => {
  if (!S3_AVAILABLE) {
    console.log("ERROR - S3 has not been initialized");
    return;
  }

  const params = {
    Bucket: bucketName,
    Key: pathToObject
  };

  await s3Instance.deleteObject(params, (err, data) => {
    if (err) {
      console.log(`ERROR - Could not delete ${pathToObject} to ${bucketName}`);
    } else {
      console.log(`File was deleted`);
    }
  }).promise();
}

module.exports.getTemporaryURL = async (bucketName, pathPrefix, id) => {
  return new Promise((resolve, reject) => {
    if (!S3_AVAILABLE) {
      reject("ERROR - S3 has not been initialized");
      return;
    }

    let params = {
      Bucket: bucketName,
      Key: generateS3FilePath(pathPrefix, id),
      ResponseContentType: "text"
    };

    s3Instance.getSignedUrl("getObject", params, (err, url) => {
      if (err) {
        reject({error: "Failed to create URL"})
      } else {
        resolve(url);
      }
    });
  })
}