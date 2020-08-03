var express = require('express');
var router = express.Router();

const pageRouter = require('./page');
const tierRouter = require('./tier');
const postRouter = require('./post');

router.use('/pages', pageRouter);
router.use('/tiers', tierRouter);
router.use('/posts', postRouter);

module.exports = router;
