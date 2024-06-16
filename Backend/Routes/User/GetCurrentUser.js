const router = require('express').Router()
const authenticate = require('../../Middlewares/Authenticate')
const User = require('../../Models/User')

//@description     Get current user 
//@route           GET /api/users/
//@access          Protected
router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password -publicId');
    if(!user) {
      return res.status(400).json({error: 'Unable to find user data'});
    }

    res.status(200).json({message: 'User retrieved', data: user});
  } catch (error) {
    console.error('Error while retrieving user:', error);
    res.status(500).json({ error: `Error while retrieving user: ${error.message}` });
  }
})

module.exports = router;