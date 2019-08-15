// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
  console.log('req.user:');
  console.log(req.user);
  // If the user is logged in, continue with the request to the restricted route
  if (req.user) {
    return next();
  }

  return res.status(401).json({ err: 'error!' });
};
