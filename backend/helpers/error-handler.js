function errorHandler(err, req, res, next) {
   let errors = {};
   if (err.name === "UnauthorizedError") {
      errors.auth = "The user is not authorized, please sign in";
      return res.status(401).json(errors);
   }
   if (err.code === 11000) {
      errors.email = "that email is already registered";
      return res.status(401).json(errors);
   }
   if (err.name === "ValidationError") {
      Object.values(err.errors).forEach(({ properties }) => {
         errors[properties.path] = properties.message;
      });
      return res.status(400).json(errors);
   }

   return res
      .status(500)
      .json({ error: err, message: "error from errorHandler" });
}

module.exports = errorHandler;
