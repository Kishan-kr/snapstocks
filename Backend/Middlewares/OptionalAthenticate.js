const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET

const optionalAuthenticate = (req, res, next) => {
  let token = req.cookies['access-token'];
  let success = false;
  
  if(!token) {
    return next()
  }
  
  try {
    // verify the token 
    jwt.verify(token, secret, (error, decoded) => {
      if(decoded){
        req.user = decoded;
      }
    })
  } catch (error) {
    console.error('Error while validating access token:', error);
  }
  next()
}

module.exports = optionalAuthenticate;