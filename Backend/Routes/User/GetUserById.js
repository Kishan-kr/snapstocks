const router = require('express').Router()
const User = require('../../Models/User')

//@description     Get user by id
//@route           GET /api/users/search/userid
//@access          Public 
router.get('/:id', (req, res)=> {
  const id = req.params.id;

  try {
    // find user in database 
    User.findById(id).select('-password').then((user) => {
      if(!user) {
        return res.status(404).json({ error: 'User not found'})
      }  

      res.status(200).json({message: 'User data fetched successfully', data: user});
    })
  } catch(error) {
    if(error){
      console.error('Error Fetching user: ', error);
      res.status(501).json({ error: `Error while fetching user: ${error.message}`})
    }
  }
})

module.exports = router;