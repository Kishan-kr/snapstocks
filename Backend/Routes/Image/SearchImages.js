const Image = require('../../Models/Image');
const router = require('express').Router();
const { sortMap } = require('../../Utils/Maps')

//@description     Get images 
//@route           GET /api/images/
//@access          Public
router.get('/', async (req, res) => {
  const itemsPerPage = Number(req.query.items) || 10; // Number of images to show per page
  const page = Number(req.query.page) || 1; // Get the requested page from the query parameters
  const keywords = req.query.keywords || '';
  const orderBy = req.query.order_by || 'newest';

  try {
    // Calculate the number of images to skip based on the requested page
    const skipCount = (page - 1) * itemsPerPage;

    let matchStage = {}
    if (keywords) {
      matchStage['$text'] = { $search: keywords }
    }

    if (req.query.dimension) {
      const dimensionFilter = req.query.dimension;

      if (dimensionFilter === 'landscape') {
        // Filter for landscape images (width > height)
        matchStage['$expr'] = { $gt: ["$width", "$height"] };
      } else if (dimensionFilter === 'portrait') {
        // Filter for portrait images (height > width)
        matchStage['$expr'] = { $gt: ["$height", "$width"] };
      }
      // For 'all', no additional filtering is applied
    }

    // aggregation pipeline to query for images
    const pipeline = [{
      $match: matchStage
    }, {
      $sort: sortMap.get(orderBy)
    }, {
      $skip: skipCount
    }, {
      $limit: itemsPerPage
    }, {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
        pipeline: [{
          $project: { firstName: 1, lastName: 1, hireable: 1, profilePic: 1, username: 1 }
        }],
      }
    },{
      // deconstruct the array from $lookup to a single document
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true
      }
    }];

    // apply aggregation to find images 
    const images = await Image.aggregate(pipeline);

    if (!images || images.length <= 0) {
      return res.status(200).json({ message: 'No image found', data: images });
    }

    res.status(200).json({ message: 'Images found', data: images });
  } catch (error) {
    console.error('Error fetching images: ', error);
    res.status(500).json({ error: `Error fetching images: ${error.message}` });
  }
});

module.exports = router;