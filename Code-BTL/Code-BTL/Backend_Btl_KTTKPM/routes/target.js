const router = require("express").Router();
const Ctrl = require("../controllers/TargetCtrl/TargetControl");

router.post("/", Ctrl.postCreateTargetKpi);
router.get("/", Ctrl.getTargetKpi);

router.get("/tree", Ctrl.getTargetTree);

router.patch("/", Ctrl.patchTargetKpi);
router.delete("/", Ctrl.deleteTargetKpi);

module.exports = router;