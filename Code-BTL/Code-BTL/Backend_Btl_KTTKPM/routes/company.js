const router = require("express").Router();
const Ctrl = require("../controllers/CompanyCtrl/CompanyControl");

router.post("/", Ctrl.postCreateCompany);
router.get("/", Ctrl.getCompany);
router.get("/trees", Ctrl.getCompanyTree);
router.get("/parents", Ctrl.getParentInfoByLevelId);

router.patch("/", Ctrl.patchCompany);
router.delete("/", Ctrl.deleteCompany);
module.exports = router;