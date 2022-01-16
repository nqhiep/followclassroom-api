module.exports = function AppError(message, statusCode) {
  const err = new Error(message);
  err.status = statusCode;
  return err;
}