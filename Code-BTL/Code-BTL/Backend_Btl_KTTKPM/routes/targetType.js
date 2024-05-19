const router = require("express").Router();
const Ctrl = require("../controllers/TargetTypeCtrl/TargetTypeControl");

router.post("/", Ctrl.postCreateTargetType);
router.get("/", Ctrl.getTargetType);

router.patch("/", Ctrl.patchTargetType);
router.delete("/", Ctrl.deleteTargetType);
module.exports = router;