const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    console.log(token)
    console.log(jwt.verify(token, process.env.JWT_SECRET))
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded; // Attach the decoded user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = authMiddleware;
