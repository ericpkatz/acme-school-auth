const isLoggedIn = (req, res, next)=> {
  if(req.user){
    return next();
  }
  const error = Error('not authorized');
  error.status = 401;
  next(error);
};

module.exports = {
  isLoggedIn
};
