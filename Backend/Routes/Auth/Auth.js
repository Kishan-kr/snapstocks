const router = require('express').Router();
const SignupUser = require('./SignupUser')
const LoginUser = require('./LoginUser')
const IsLoggedIn = require('./IsLoggedIn')
const Logout = require('./Logout')

// combine all auth routes
router.use(SignupUser);
router.use(LoginUser);
router.use(IsLoggedIn);
router.use(Logout);

// export router object 
module.exports = router;
