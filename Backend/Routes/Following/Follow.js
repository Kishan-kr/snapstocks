const express = require('express');
const router = express.Router();
const authenticate = require('../../Middlewares/Authenticate');
const Following = require('../../Models/Following');

//@description     Follow another user
//@route           POST /api/following/userId
//@access          Protected
router.post('/:userId', authenticate, async (req, res) => {
  // Find the client's ID from the authenticated request
  const followerId = req.user._id;

  // Find the followee's ID from the param
  const followeeId = req.params.userId;

  try {
    if(followerId === followeeId) {
      return res.status(409).json({error: 'Not allowed'})
    }
    
    // check if user has already followed 
    const hasFollowed = await Following.findOne({
      followee: followeeId,
      follower: followerId
    })
    if(hasFollowed) {
      return res.status(200).json({message: 'Already following', data: hasFollowed})
    }

    // Create a following doc
    const following = await Following.create({ 
      follower: followerId, 
      followee: followeeId
    });

    // Error if unable to create
    if(!following) {
      return res.status(400).json({error: 'Unable to follow'})
    }

    // Return the following doc on success
    res.status(200).json({message: 'Followed', data: following});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error while following: ${error.message}` });
  }
});

module.exports = router;
