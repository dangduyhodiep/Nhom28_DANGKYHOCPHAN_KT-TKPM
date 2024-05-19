const { createTargetKpi, disableTargetKpi, findTargetKpis,findAllTargetKpis, updateTargetKpi, deleteTargetKpi } = require("./TargetDataFunc");
const { buildTree } = require("../ShareCtrl/TreeCtrl")

module.exports = {
    postCreateTargetKpi: async (req, res) => {
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
        const objCreate = await createTargetKpi(objInput.body);

        if (!objCreate) {
            return res.status(400).json({ message: "Không thể tạo mới mục tiêu!" })
        }
        return res.status(201).json({ message: "Tạo mới mục tiêu thành công!", data: objCreate })
    },
    getTargetKpi: async (req, res) => {
        let objFind;
        if (req.query.id) {
            objFind = await findTargetKpis({ _id: req.query.id })
        } else {
            objFind = await findAllTargetKpis();

        }
        return res.status(200).json({ message: "Tìm thông tin mục tiêu thành công!", data: objFind })
    },
    getTargetTree: async (req,res) => {
        let arrData = await findAllTargetKpis();
        let arrDataTemp = arrData.map(mapped => ({...mapped, _id: mapped._id.toString(), children: [], label:mapped.name}))
        // return res.json(arrDataTemp)
        const arrResult = buildTree(arrDataTemp);
        return res.status(200).json({message:"Tìm thông tin mục tiêu thành công", data: arrResult})
    },
    patchTargetKpi: async(req, res) => {
        if(req.body && req.query.id){
            let updateRecord = await updateTargetKpi(req.query.id, req.body);
            if(updateRecord){
                return res.status(200).json({message:"Update mục tiêu thành công", data:updateRecord})
            }
            return res.status(400).json({message:"Update mục tiêu không thành công", data:req.query.id})
        }
        return res.status(400).json({message:"Update mục tiêu không thành công"})

    },
    deleteTargetKpi:async (req, res) => {
        if(req.body._id){
            let deleteRecord = await deleteTargetKpi({...req.body});
            if(deleteRecord.deletedCount){
                return res.status(200).json({message:"Xoá mục tiêu thành công"})
            }
            return res.status(200).json({message:"Xoá mục tiêu không thành công"})
        }
        return res.status(400).json({message:"Xoá mục tiêu không thành công"})
    }
}
