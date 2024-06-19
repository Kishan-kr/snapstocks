const router = require('express').Router()
const GetUserById = require('./GetUserById')
const GetCurrentUser = require('./GetCurrentUser')
const UpdateUser = require('./UpdateUser')
const GetUsers = require('./GetUsers')
const DeleteUser = require('./DeleteUser')
const ChangePassword = require('./ChangePassword')
const GetUserByUsername = require('./GetUserByUsername')

// combine different routes to single route
router.use(GetUserByUsername);
router.use(GetUserById);
router.use(GetUsers);
router.use(GetCurrentUser);
router.use(UpdateUser);
router.use(DeleteUser);
router.use(ChangePassword)

// export router object 
module.exports = router;