const authenticate = require('../../Middlewares/Authenticate');
const User = require('../../Models/User');

const router = require('express').Router();

router.delete('/:id', async (req, res) => {
  const userid = req.params.id

  try {
    const deletedUser = await User.findByIdAndDelete(userid);
    if(!deletedUser) {
      return res.status(400).json({error: 'Unable to delete the user'})
    }
    res.status(200).json({message: 'User deleted', user: deletedUser})
  } catch (error) {
    console.log('Error deleting user:', error)
    res.status(500).json({error})
  }
})

module.exports = router;