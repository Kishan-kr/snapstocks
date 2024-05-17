const jwt = require('jsonwebtoken');

const router = require('express').Router();

router.get('/check-login', (req, res) => {
  try { 
    let token = req.cookies('access-token');
    console.log(token)
  
    // Return false if token is not available 
    if(!token) {
      return res.status(200).json({message: "Access token not available", isLoggedIn : false})
    }
  
    // verify the token 
    jwt.verify(token, secret, (error, decoded) => {
      if(error){
        res.status(200).json({message: "Invalid access token", isLoggedIn : false})
      }
      res.status(200).json({message: 'Authenticated', isLoggedIn: true});
    })
  } catch (error) {
    console.error('Unable to verify access token:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
})

module.exports = router;