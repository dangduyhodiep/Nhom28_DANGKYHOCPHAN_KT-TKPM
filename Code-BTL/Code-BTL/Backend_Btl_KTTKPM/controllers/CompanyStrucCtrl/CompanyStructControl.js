const { createCompanyLevel, disableCompanyLevel, findCompanyLevels, findAllCompanyLevels, updateCompanyLevel } = require("./CompanyStructDataFunc");
module.exports = {
    postCreateCompanyLevelStruct: async (req, res) => {
        const objInput = {
            query: req.query,
            body: req.body,
        };
        if (!objInput.body.isDiable) {
            objInput.body.isDiable = false;
        }
        if (!objInput.body.parentId) {
            objInput.body.parentId = "";
        }
        const objCreate = await createCompanyLevel(objInput.body);

        if (!objCreate) {
            return res.status(400).json({ message: "Không thể tạo mới cấu trúc công ty!" })
        }
        return res.status(201).json({ message: "Tạo mới cấu trúc công ty thành công!", data: objCreate })
    },
    getCompanyLevelStruct: async (req, res) => {
        let objFind;
        if (req.query.id) {
            objFind = await findCompanyLevels({ _id: req.query.id })
        } else {
            objFind = await findAllCompanyLevels();
        }
        return res.status(200).json({ message: "Tìm cấu trúc công ty thành công!", data: objFind })

    },
    patchCompanyLevelStruct: async (req, res) => {
        if(req.body && req.query.id){
            let updateRecord = await updateCompanyLevel(req.query.id, req.body);
            if(updateRecord){
                return res.status(200).json({message:"Update công ty thành công", data:updateRecord})
            }
            return res.status(400).json({message:"Update công ty không thành công", data:req.query.id})
        }
        return res.status(400).json({message:"Update công ty không thành công"})

    },
    deleteCompanyLevelStruct: (req, res) => {

    },
}