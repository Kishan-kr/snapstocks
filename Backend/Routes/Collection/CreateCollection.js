const authenticate = require('../../Middlewares/Authenticate')
const { body, validationResult } = require('express-validator');
const ImageCollection = require('../../Models/ImageCollection');
const User = require('../../Models/User');
const router = require('express').Router()

//@description     Create new collection
//@route           POST /api/collections/
//@access          Protected
router.post('/', authenticate, [
  body('name').exists().withMessage("Collection name cannot be empty")
], async (req, res) => {
  const user = req.user._id;
  
  // return if validation errors 
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({error: errors.array()})
  }

  const collection = {
    user,
    name: req.body.name
  }

  if(req.body.description !== undefined) {
    collection.description = req.body.description;
  }
  if(req.body.private) {
    collection.private = req.body.private;
  }

  try {
    const newCollection = await ImageCollection.create(collection);

    // return error if unable to create the collection 
    if(!newCollection) {
      return res.status(400).json({error: 'Unable to create collection'})
    }

    // increase collection count of user 
    const owner = await User.findByIdAndUpdate(user, {$inc: {collectionsCount: 1}}, {new: true})

    res.status(200).json({message: 'Collection created', data: newCollection});
  } catch (error) {
    console.log('Error creating collection: ', error);
    res.status(500).json({error: `Error creating collection: ${error.message}`});
  }
})

module.exports = router;