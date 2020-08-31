const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    req.authUser = false;
    return next();
  }

  const token = authHeader.split(' ')[1];      // Authorization:bearer token..
  if (!token || token === '') {
    req.authUser = false;
    return next();
  } else {
    const decoded = jwt.verify(token, 'powerfulSecret');
    req.authUser = true;
    req.userId  = decoded.userId;
    console.log(`authUser: ${req.authUser}, userId: ${req.userId}`);
    return next();
  }
}

module.exports = authMiddleware;