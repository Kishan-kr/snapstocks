const optionalAuthenticate = require('../../Middlewares/OptionalAthenticate');
const Image = require('../../Models/Image');

const router = require('express').Router();

//@description     Get count of images 
//@route           GET /api/images/count
//@access          Public
router.get('/count', optionalAuthenticate, async (req, res) => {
  const userId = req.user?._id || null;
  // count images by user if userId available 
  if(userId) {
    const count = await Image.countDocuments({user: userId});
    return res.status(200).json({message: 'Images counted', data: count});
  }

  // count queried images 
  const keywords = req.query.keywords || '';

  const query = {
    $text: { $search: keywords }
  }

  // Check if the dimension filter is provided in the request
  if (req.query.dimension) {
    const dimensionFilter = req.query.dimension;

    if (dimensionFilter === 'landscape') {
      // Filter for landscape images (width > height)
      query.$expr = { $gt: ["$width", "$height"] };
    } else if (dimensionFilter === 'portrait') {
      // Filter for portrait images (height > width)
      query.$expr = { $gt: ["$height", "$width"] };
    }
    // For 'all', no additional filtering is applied
  }

  try {
    // count the no of images by passing query
    const count = await Image.countDocuments(query);

    res.status(200).json({message: 'Images found', data: count});

  } catch (error) {
    console.error('Error counting images: ', error);
    res.status(500).json({ 'error': `Error while getting count of images: ${error.message}` });
  }
})

module.exports = router;