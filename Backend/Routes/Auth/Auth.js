const router = require('express').Router();
const SignupUser = require('./SignupUser')
const LoginUser = require('./LoginUser')
const IsLoggedIn = require('./IsLoggedIn')

// combine all auth routes
router.use(SignupUser);
router.use(LoginUser);
router.use(IsLoggedIn);

// export router object 
module.exports = router;
