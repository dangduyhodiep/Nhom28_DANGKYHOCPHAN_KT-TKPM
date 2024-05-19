const router = require("express").Router();
const Ctrl = require("../controllers/KpiByTimeCtrl/targetKpiByTimeControl");

router.post("/", Ctrl.postCreateTargetKpiByTime);
router.get("/full-info", Ctrl.getFullInfoTargetKpyByTime);
router.get("/", Ctrl.getTargetKpiByTime);

router.patch("/", Ctrl.patchTargetKpiByTime);
router.delete("/", Ctrl.deleteTargetKpiByTime);
module.exports = router;