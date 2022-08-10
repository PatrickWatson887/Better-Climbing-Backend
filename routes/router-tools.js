module.exports = {
  respond(res, response) {
    res.send(response);
    res.status(200).end();
  },

  verifyType(obj, property, type) {
    if (typeof (obj[property]) !== type) {
      throw {error: `${property} should be a ${type}`};
    }
    return (type === "string") ? `'${obj[property]}'` : obj[property];
  },

  getRequiredProperty(obj, property, type="string") {
    let nullVal = obj == null || obj[property] == null && obj[property] !== 0;

    if (nullVal) {
      throw {error: `${property} is null, must be set.`};
    }

    return module.exports.verifyType(obj, property, type);
  },

  getOptionalProperty(obj, property, type) {
    let nullVal = obj == null || obj[property] == null && obj[property] !== 0;

    if (nullVal) {
      return null;
    }

    return module.exports.verifyType(obj, property, type);
  }
}

