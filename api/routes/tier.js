var express = require("express");
var router = express.Router();

const TierController = require('../controllers/TierController');

router.get("/", TierController.get);
router.get("/:id", TierController.getById);
router.get("/page/:id", TierController.getByPageId);

router.post("/", TierController.post);
router.put("/activate", TierController.activate);
router.delete("/:id", TierController.remove);

module.exports = router;