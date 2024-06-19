const router = require('express').Router()
const User = require('../../Models/User')
const Image = require('../../Models/Image')

//@description     Get user by id
//@route           GET /api/users/search/userid
//@access          Public 
router.get('/username/:username', async (req, res) => {
  const username = req.params.username;

  try {
    // find user in database 
    let user = await User.findOne({ username }).select('-password')
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // get images count
    const imagesCount = await Image.find({ user: user._id }).count()
    if(imagesCount){
      user = {...user.toObject(), imagesCount}
    }
    res.status(200).json({ message: 'User data fetched successfully', data: user });

  } catch (error) {
    if (error) {
      console.error('Error Fetching user by username: ', error);
      res.status(501).json({ error: `Error while fetching user: ${error.message}` })
    }
  }
})

module.exports = router;