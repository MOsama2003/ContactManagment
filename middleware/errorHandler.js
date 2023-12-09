const { constants } = require("../middleware/errorConstants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Un Authorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Not Validated",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("No Error, All Good!");
      break;
  }
};
module.exports = errorHandler;
