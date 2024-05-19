const router = require("express").Router();
const Ctrl = require("../controllers/CompanyStrucCtrl/CompanyStructControl");

router.post("/", Ctrl.postCreateCompanyLevelStruct);
router.get("/", Ctrl.getCompanyLevelStruct);

router.patch("/", Ctrl.patchCompanyLevelStruct);
router.delete("/", Ctrl.deleteCompanyLevelStruct);
module.exports = router;