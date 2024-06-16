const { deleteFromCloudinary } = require('../../Utils/ConfigCloudinary');
const Image = require('../../Models/Image');
const UserImageLike = require('../../Models/UserImageLike');
const deleteFromCollections = require('../../Utils/DeleteFromCollections');
const deleteImageViews = require('../../Utils/DeleteImageViews');
const authenticate = require('../../Middlewares/Authenticate');
const router = require('express').Router();

//@description     Delete an image
//@route           DELETE /api/images/imageid
//@access          Protected
router.delete('/:id', authenticate, async (req, res) => {
  const user = req.user._id;

  try {

    // Find and delete the image by id
    const deletedImage = await Image.findOneAndDelete({_id: req.params.id, user})

    if (!deletedImage) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Delete all viewImage documents of this image 
    deleteImageViews(deletedImage._id);

    // Delete all the documents of UserImageLike model associated with this image 
    UserImageLike.deleteMany({image: deletedImage._id});

    // Delete all the documents of relation and decrement imageCount in Collection associated with this image 
    deleteFromCollections(deletedImage._id);

    //Delete the above image from cloudinary also
    const deleteResult = await deleteFromCloudinary(deletedImage.publicId);
    
    if (!deleteResult) {
      return res.status(400).json({ error: 'Something went wrong, unable to delete image' });
    }

    res.status(200).json({ message: 'Image deleted', data: deletedImage });
    
  } catch (error) {
    console.error('Error deleting image: ', error);
    res.status(500).json({ error: `Error deleting image: ${error.message}` });
  }
});

module.exports = router;
