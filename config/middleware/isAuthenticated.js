// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  if (req.user) {
    console.log("REQ.USER is: ");
    console.table(req.user);
    return next();
  } else {
    console.log(
      `Invalid Authentication from address: ${req.connection.remoteAddress}`
    );
    // If the user isn't logged in, redirect them to the login page
    return res.redirect("/home");
  }
};
