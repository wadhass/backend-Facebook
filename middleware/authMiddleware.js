// const jwt = require('jsonwebtoken');
// const response = require('../utils/responceHandler');


// const  authMiddleware = (req,res,next) =>{
//     const authToken = req?.cookies?.auth_token;
//     if(!authToken) return response(res,401, 'Authentication required. please provide a token');

//     try {
//          const decode = jwt.verify(authToken,process.env.JWT_SECRET);
//          req.user = decode;
//          next();
//     } catch (error) {
//         console.error(error)
//         return response(res,401, 'Invalid token or expired. Please try again')
//     }
// }

// module.exports = authMiddleware;





const jwt = require('jsonwebtoken');
const response = require('../utils/responceHandler');

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.auth_token;

  if (!token) {
    return response(res, 401, 'Authentication required. Please provide a valid token.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT verification error:', error.message);
    return response(res, 401, 'Invalid or expired token. Please log in again.');
  }
};

module.exports = authMiddleware;
