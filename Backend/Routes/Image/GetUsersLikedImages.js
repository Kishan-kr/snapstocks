const router = require('express').Router()
const optionalAuthenticate = require('../../Middlewares/OptionalAthenticate');
const UserImageLike = require('../../Models/UserImageLike') 

//@description     Get liked images of a user with pagination
//@route           GET /api/images/users/userid/likes
//@access          Public
router.get('/users/:userId/likes', optionalAuthenticate, async (req, res) => {
  const userId = req.params.userId;
  const itemsPerPage = req.query.items; // Number of images to show per page
  const page = req.query.page || 1; // Get the requested page from the query parameters
  const loggedInUser = req.user?._id

  try {
    // Calculate the number of images to skip based on the requested page
    const skipCount = Number(page - 1) * Number(itemsPerPage);

    // Find images of a user in DB with pagination
    let images = await UserImageLike.find({ user: userId })
      .sort({createdAt: -1})
      .skip(skipCount)
      .limit(itemsPerPage)
      .populate({path: 'image'})
      .lean()

      if (!images || images.length <= 0) {
        return res.status(200).json({ message: 'No image found', data: {images, page} });
      }
  
      if(!loggedInUser) {
        return res.status(200).json({ message: 'Images fetched', data: {images, page} });
      }
  
      // check if loggedIn user has liked these images 
      let imageIds = images.map(image => image._id.toString())
      const likedImages = await UserImageLike.find({user: loggedInUser, image: {$in: imageIds}})
      
      let likedImageIds = new Set(likedImages.map(item => item.image.toString()))
  
      images = images.map(image => ({...image, isLiked: likedImageIds.has(image._id.toString()) ? true : false}))
  
      res.status(200).json({ message: 'Images fetched', data: {images, page} });
  } catch (error) {
    console.error("Error fetching user's liked images: ", error);
    res.status(500).json({ error: `Error fetching user's liked images: ${error.message}` });
  }
})

module.exports = router