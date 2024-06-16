const { request } = require('express');
const authenticate = require('../../Middlewares/Authenticate');
const Image = require('../../Models/Image');

const router = require('express').Router()

//@description     Update an image
//@route           PUT /api/images/imageid
//@access          Protected
router.put('/:id', authenticate, async (req, res) => {
  const user = req.user._id;

  try {
    // Find the image in DB 
    const image = await Image.findOne({_id : req.params.id, user});

    if(!image) {
      return res.status(404).json({ error: 'Image not found'})
    }
    
    // Update the desired fields based on req.body
    if (req.body.description !== undefined) {
      image.description = req.body.description;
    }
    if (req.body.location !== undefined) {
      image.location = req.body.location;
    }
    if (req.body.tags !== undefined) {
      image.tags = req.body.tags;
    }
    
    await image.save();
    res.status(200).json({message: 'Image updated', data: image})

  } catch (error) {
    console.error('Error updating image: ', error)
    res.status(500).json({ error: `Error updating image: ${error.message}`})
  }

})

module.exports = router;