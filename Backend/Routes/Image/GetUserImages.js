const optionalAuthenticate = require('../../Middlewares/OptionalAthenticate');
const Image = require('../../Models/Image');
const UserImageLike = require('../../Models/UserImageLike');
const router = require('express').Router();

//@description     Get images of a user with pagination
//@route           GET /api/images/users/userid
//@access          Public
router.get('/users/:userId', optionalAuthenticate, async (req, res) => {
  const targetUserId = req.params.userId;
  const loggedInUser = req.user?._id;
  const itemsPerPage = parseInt(req.query.items) || 10; // Number of images to show per page
  const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameters

  try {
    // Calculate the number of images to skip based on the requested page
    const skipCount = (page - 1) * itemsPerPage;

    // Find images of a user in DB with pagination
    let images = await Image.find({ user: targetUserId })
      .sort({createdAt: -1})
      .skip(skipCount)
      .limit(itemsPerPage)
      .populate('user', '-password').lean()

    if (!images || images.length <= 0) {
      return res.status(200).json({ message: 'No image found', data: {images, page} });
    }

    if(!loggedInUser) {
      return res.status(200).json({ message: 'Images fetched', data: {images, page} });
    }

    // check if loggedIn user has liked these images 
    let imageIds = images.map(image => image._id)
    const likedImages = await UserImageLike.find({user: loggedInUser, image: {$in: imageIds}})
    
    let likedImageIds = new Set(likedImages.map(item => item.image.toString()))

    images = images.map(image => ({...image, isLiked: likedImageIds.has(image._id.toString()) ? true : false}))

    res.status(200).json({ message: 'Images fetched', data: {images, page} });
  } catch (error) {
    console.error('Error fetching user images: ', error);
    res.status(500).json({ error: `Error fetching user images: ${error.message}` });
  }
});

module.exports = router;
