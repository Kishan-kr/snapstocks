const authenticate = require('../../Middlewares/Authenticate');
const User = require('../../Models/User');

const router = require('express').Router();

//@description     Delete current user 
//@route           DELETE /api/users/
//@access          Protected
router.delete('/', authenticate, async (req, res) => {
  const userid = req.user._id

  try {
    const deletedUser = await User.findByIdAndDelete(userid);
    if(!deletedUser) {
      return res.status(400).json({error: 'Unable to delete the user'})
    }
    res.status(200).json({message: 'User deleted', data: deletedUser})
  } catch (error) {
    console.log('Error deleting user:', error)
    res.status(500).json({error: `Error while deleting user: ${error.message}`})
  }
})

module.exports = router;