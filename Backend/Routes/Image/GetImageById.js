const optionalAuthenticate = require('../../Middlewares/OptionalAthenticate');
const trackImageViews = require('../../Middlewares/TrackImageViews');
const Image = require('../../Models/Image');
const UserImageLike = require('../../Models/UserImageLike');
const router = require('express').Router();

//@description     Get an image by id
//@route           GET /api/images/imageid
//@access          Public
router.get('/:imageId', trackImageViews, optionalAuthenticate, async (req, res) => {
  const imageId = req.params.imageId;
  const loggedInUser = req.user?._id

  try {
    // Find the image using imageId
    let image = await Image.findById(imageId)
    .populate({
      path: 'user',
      select: 'firstName lastName username profilePic name'
    }).lean();

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    if(loggedInUser) {
      const likedImage = await UserImageLike.findOne({user: loggedInUser, image: image._id})
      if(likedImage) {
        image.isLiked = true
      }
    }

    res.status(200).json({ message: 'Image fetched', data: image });
  } catch (error) {
    console.error('Error fetching image: ', error);
    res.status(500).json({ error: `Error fetching image: ${error.message}`});
  }
});

module.exports = router;
