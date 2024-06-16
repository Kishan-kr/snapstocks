const Image = require('../../Models/Image');
const User = require('../../Models/User');

const router = require('express').Router()

//@description     Search users 
//@route           GET /api/users/search
//@access          Public 
router.get('/search', async (req, res) => {
  const keywords = req.query.keywords;
  console.log(keywords)
  if (!keywords) {
    return res.status(400).json({ error: 'Keywords are required for the search.' });
  }

  const itemsPerPage = parseInt(req.query.items, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const skipCount = (page - 1) * itemsPerPage;

  const pipeline = [
    {
      $match: {
        $text: {
          $search: keywords
        }
      }
    },
    {
      $sort: {
        score: {
          $meta: "textScore"
        }
      }
    },
    { $skip: skipCount },
    { $limit: itemsPerPage },
    // Optionally include other fields in the projection if needed
    { $project: { password: 0 } }
  ];

  try {
    // find the searched users 
    const users = await User.aggregate(pipeline).exec();

    // pick three images of those users (greater in views > greater in downloads)
    users.map(async user => {
      const images = await Image.aggregate([
        {
          $sort: {
            views: -1,
            downloads: -1
          }
        },
        {
          $limit: 3
        }
      ])
      
      user.images = images;
    })

    if (!users) {
      console.log('No user found');
    }
    return res.status(200).json({message: 'Users fetched', data: users });
  } catch (error) {
    console.error('Error searching users:', error.message);
    res.status(500).json({ error: `Error while searching users: ${error.message}` });
  }
});


module.exports = router;