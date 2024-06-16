const optionalAuthenticate = require('../../Middlewares/OptionalAthenticate');
const ImageCollection = require('../../Models/ImageCollection');
const router = require('express').Router()

//@description     Get all collections of a user
//@route           GET /api/collections/users/userid
//@access          Public
router.get('/users/:userId', optionalAuthenticate, async (req, res) => {
  const userId = req.params.userId;
  const clientUserId = req.user?._id || null;
  
  try {
    // Private collections can only be accessed by their owner
    if(clientUserId === userId) {
      const collections = await ImageCollection.find({user: userId});
      const count = collections?.length;
      return res.status(200).json({message: 'Collections found', data: {count, collections}});
    }
    
    const collections = await ImageCollection.find({user: userId, private: false});
    const count = collections.length;
    res.status(200).json({message: 'Collections found', data: {count, collections}});
  } catch (error) {
    console.log('Error fetching collections: ', error);
    res.status(500).json({error: `Error getting collections: ${error.message}`});
  }
})

module.exports = router;