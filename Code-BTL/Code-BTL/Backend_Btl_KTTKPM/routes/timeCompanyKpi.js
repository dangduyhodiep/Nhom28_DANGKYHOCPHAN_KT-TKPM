const router = require("express").Router();
const Ctrl = require("../controllers/TimeCompanyCtrl/TimeCompanyControl");

router.post("/", Ctrl.postCreateTimeCompany);
router.get("/", Ctrl.getTimeCompany);

router.patch("/", Ctrl.patchTimeCompany);
router.delete("/", Ctrl.deleteTimeCompany);
module.exports = router;