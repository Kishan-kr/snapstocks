const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET

const authenticate = (req, res, next) => {
  try {
    let token = req.cookies['access-token'];
    let success = false;
  
    // Return error if token is not available 
    if(!token) {
      return res.status(401).json({success, error : "Unauthorized request"})
    }
  
    // verify the token 
    jwt.verify(token, secret, (error, decoded) => {
      if(error){
        res.status(401).json({success, error: 'Invalid access token'})
      }
      req.user = decoded;
      next()
    })
  } catch (error) {
    console.error('Error while validating access token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = authenticate;