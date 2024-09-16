const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token
  let result = {
    status:false,
    message:'',
    data:null
  };
  if (!token) {
    result.message = 'No token provided, access denied';

    return res.status(403).json(result);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store the decoded token data in the request object for further use
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    result.message = 'Invalid token';
    return res.status(401).json(result);
  }
};

module.exports = verifyToken;
