const { createCompanyStruct, disableCompanyStruct, findCompanyStructs, findAllCompanyStructs, updateCompanyStruct, deleteCompanyStruct } = require("./CompanyDataFunc");
const { findCompanyLevels, findAllCompanyLevelsByLevels } = require("../CompanyStrucCtrl/CompanyStructDataFunc")
const { buildTree } = require("../ShareCtrl/TreeCtrl")

module.exports = {
    postCreateCompany: async (req, res) => {
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
        const objCreate = await createCompanyStruct(objInput.body);

        if (!objCreate) {
            return res.status(400).json({ message: "Không thể tạo mới!" })
        }
        return res.status(201).json({ message: "Tạo mới dữ liệu thành công!", data: objCreate })
    },
    getCompany: async (req, res) => {
        let objFind;
        if (req.query.id) {
            objFind = await findCompanyStructs({ _id: req.query.id })
        } else {
            objFind = await findAllCompanyStructs();
        }
        return res.status(200).json({ message: "Tìm thông tin thành công!", data: objFind })
    },
    patchCompany: async (req, res) => {
        if(req.body && req.query.id){
            let updateRecord = await updateCompanyStruct(req.query.id, req.body);
            if(updateRecord){
                return res.status(200).json({message:"Update công ty thành công", data:updateRecord})
            }
            return res.status(400).json({message:"Update công ty không thành công", data:req.query.id})
        }
        return res.status(400).json({message:"Update công ty không thành công"})
    },
    deleteCompany: async (req, res) => {
        if(req.body._id){
            let deleteRecord = await deleteCompanyStruct({...req.body});
            if(deleteRecord.deletedCount){
                return res.status(200).json({message:"Xoá công ty thành công"})
            }
            return res.status(200).json({message:"Xoá công ty không thành công"})
        }
        return res.status(400).json({message:"Xoá công ty không thành công"})
    },
    getCompanyTree: async (req, res) => {

        const companyData = await findAllCompanyStructs();
        let companyStructData = await findAllCompanyLevelsByLevels();

        const companyDataTemp = companyData.map(mapped => {
            let companyStructId = companyStructData.find(finder => finder._id.toString() === mapped.companyLevelStructId)
            if (companyStructId) {
                return {
                    _id: mapped._id.toString(),
                    techCompanyName: mapped.techName,
                    label: mapped.name,
                    userCreate: mapped.userCreate,
                    userUpdate: mapped.userUpdate,
                    isDiable: mapped.isDiable,
                    parentId: mapped.parentId,
                    createdAt: new Date(mapped.createdAt).toLocaleString("vi-VN"),
                    updatedAt: new Date(mapped.updatedAt).toLocaleString("vi-VN"),
                    level: companyStructId.level,
                    structName: companyStructId.name,
                    techStructName: companyStructId.techName,
                    children: []
                }
            }
        })

        const arrResult = buildTree(companyDataTemp)
        return res.status(200).json({ message: "Lấy cây sơ đồ tổ chức thành công", data: arrResult })

    },
    getParentInfoByLevelId: async(req, res) => {
        const companyStructLevel = await findCompanyLevels({_id: req.query.companyLevelStructId});

        let level = companyStructLevel[0].level === 0 ? 0 : companyStructLevel[0].level - 1;
        console.log(level)
        const parentCompanyLevelId = await findCompanyLevels({level});

        if(parentCompanyLevelId.length){
            const dataResult = await findCompanyStructs({companyLevelStructId: parentCompanyLevelId[0]._id});
        return res.status(200).json({message:"Tìm kiếm dữ liệu thành công!", data:dataResult});
        }
        return res.status(400).json({message:"No record"})
    }
}