const authenticate = require('../../Middlewares/Authenticate');
const CollectionImageRelation = require('../../Models/CollectionImageRelation');
const Image = require('../../Models/Image');
const ImageCollection = require('../../Models/ImageCollection');
const { getCloudinaryUrl } = require('../../Utils/ConfigCloudinary');
const router = require('express').Router()

//@description     Update collection (add or remove images)
//@route           PUT /api/collections/
//@access          Protected
router.put('/', authenticate, async (req, res) => {

  const collection = req.body.collection;
  const imageId = req.body.image;
  const action = Number(req.query.action) // 1 to add ; 0 to remove

  // check if collection is owned by requested user 
  let matchedCollection = await ImageCollection.findOne({user: req.user._id, _id: collection});
  if(!matchedCollection) {
    return res.status(401).json({error: 'Request not allowed'})
  }

  try {
    // Add image to collection if not already 
    if(action === 1){
      const imageExist = await CollectionImageRelation.findOne({
        imageCollection: collection,
        image: imageId
      })

      if(imageExist) {
        return res.status(200).json({message: 'Image added', data: imageExist})
      }

      const addedImage = await CollectionImageRelation.create({
        imageCollection: collection,
        image: imageId
      })

      if(!addedImage) {
        return res.status(400).json({error: 'Unable to add the image'})
      }

      const image = await Image.findById(imageId).select('publicId').lean()
      const imageUrl = getCloudinaryUrl(image.publicId, {width: '640', crop: 'scale'})

      // increment imageCount and update thumbnail of the collection 
      
      matchedCollection.imageCount += 1
      matchedCollection.thumbnail.unshift(imageUrl)
      if(matchedCollection.thumbnail.length > 3) {
        matchedCollection.thumbnail.pop()
      }
      await matchedCollection.save()

      return res.status(200).json({message: 'Image added', data: addedImage})
    }

    // Remove image from collection
    else if(action === 0) {
      const removedImage = CollectionImageRelation.findOneAndDelete({
        imageCollection: collection,
        image: imageId
      });

      if(!removedImage) {
        return res.status(400).json({error: 'Unable to remove from collection'});
      }

      // decrement imageCount of the collection 
      ImageCollection.findByIdAndUpdate(collection, {$inc: {imageCount: -1}});

      return res.status(200).json({message: 'Image removed', data: removedImage})
    }
    else {
      res.status(400).json({error: 'Invalid request'})
    }
    
  } catch (error) {
    console.log('Error updating collection: ', error);
    res.status(500).json({error: `Error updating collection: ${error.message}`});
  }
})

module.exports = router;