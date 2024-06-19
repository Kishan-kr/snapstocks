const authenticate = require('../../Middlewares/Authenticate')

const router = require('express').Router()

router.get('/logout', authenticate, async (req, res) => {
  res.status(200)
  .clearCookie('access-token', {httpOnly: true, secure: false})
  .json({message: 'logout success', data: {}})
})

module.exports = router