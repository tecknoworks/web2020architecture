var express = require("express");
var router = express.Router();

const PageController = require('../controllers/PageController');

router.get("/", PageController.get);
router.get("/:id", PageController.getById);
router.post("/", PageController.post);
router.delete("/:id", PageController.remove);

module.exports = router;