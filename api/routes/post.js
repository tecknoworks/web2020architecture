var express = require("express");
var router = express.Router();

const PostController = require('../controllers/PostController');

router.get("/", PostController.get);
router.get("/:id", PostController.getById);
router.get("/page/:id", PostController.getByPageId);

router.post("/", PostController.post);
router.delete("/:id", PostController.remove);

module.exports = router;