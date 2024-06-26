const { body, validationResult } = require('express-validator');
const authenticate = require('../../Middlewares/Authenticate');
const User = require('../../Models/User');
const { isValidUsername } = require('../../Utils/CustomValidators');
const router = require('express').Router();


//@description     Update user data
//@route           PUT /api/users/
//@access          Protected 
router.put('/', authenticate, 
[
  body('firstName', 'First name must contain alphabets only')
    .optional()
    .isAlpha()
    .isLength({ min: 3 })
    .withMessage('First name must contain minimum three letters'),

  body('lastName', 'Last name must contain alphabets only')
    .optional()
    .isAlpha()
    .isLength({ min: 3 })
    .withMessage('Last name must contain minimum three letters'),

  body('username')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Minimum length of username must be 3')
    .isString()
    .custom(isValidUsername)
    .withMessage('Username can only contain numbers, alphabets, and underscores')
    .custom(async (value) => {
      const existingUser = await User.findOne({ username: value });
      if (existingUser) {
        throw new Error('Username is already taken');
      }
    }),
], async (req, res) => {
  const userId = req.user._id;
  const { firstName, lastName, username } = req.body;

  // extract errors from request 
  const errors = validationResult(req);

  // send validation errors if available 
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({error: errors.array()});
  }

  // Check if 'email' or 'password' fields are present in the updateFields object
  // if ('email' in updateFields || 'password' in updateFields) {
  //   console.error({error: 'Updating Email or password is not allowed'} )
  //   return res.status(400).json({ error: 'Bad request' });
  // }

  let updateFields = Object.create({});
  if( firstName ) { updateFields.firstName = firstName }
  if( lastName ) { updateFields.lastName = lastName }
  if( username ) { updateFields.username = username }

  if(Object.keys(updateFields).length <= 0) {
    return res.status(400).json({error: 'No field to update'})
  }

  try {
    // Find user information from DB and update
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true })


    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({message: 'User updated successfully', data: updatedUser});

  } catch (err) {
    console.error('Error updating user:', err);
    return res.status(500).json({ error: `Error while updating user: ${err.message}` });
  }
})
module.exports = router;