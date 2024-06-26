const router = require('express').Router()
const PostImage = require('./PostImage')
const GetUserImages = require('./GetUserImages')
const GetImageById = require('./GetImageById')
const SearchImages = require('./SearchImages')
const DeleteImage = require('./DeleteImage')
const UpdateImage = require('./UpdateImage')
const LikeImage = require('./LikeImage')
const DownloadImage = require('./DownloadImage')
const CountImages = require('./CountImages')
const GetUsersLikedImages = require('./GetUsersLikedImages')

router.use(PostImage);
router.use(CountImages);
router.use(GetUsersLikedImages);
router.use(GetUserImages);
router.use(GetImageById);
router.use(SearchImages);
router.use(DeleteImage);
router.use(UpdateImage);
router.use(LikeImage);
router.use(DownloadImage);

module.exports = router;