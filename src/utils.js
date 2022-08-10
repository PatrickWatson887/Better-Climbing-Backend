module.exports.checkString = (value) => {
  return (typeof value === 'string' || value instanceof String);
}

module.exports.getFileType = (fileName) => {
  switch (fileName.split(".").pop()) {
    case "jpeg" || "jpg":
      return "image/jpeg";
    case "png":
      return "image/png";
    default:
      return "binary/octet-stream";
  }
}