const router = require('express').Router()
const GetUserById = require('./GetUserById')
const GetCurrentUser = require('./GetCurrentUser')
const UpdateUser = require('./UpdateUser')
const GetUsers = require('./GetUsers')
const DeleteUser = require('./DeleteUser')
const ChangePassword = require('./ChangePassword')

// combine different routes to single route
router.use(GetUserById);
router.use(GetUsers);
router.use(GetCurrentUser);
router.use(UpdateUser);
router.use(DeleteUser);
router.use(ChangePassword)

// export router object 
module.exports = router;