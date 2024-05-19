const { findTargetKpis } = require("../TargetCtrl/TargetDataFunc");
const { findTargetTypes } = require("../TargetTypeCtrl/TargetTypeDataFunc");
const { createTargetKpiByTime, deleteTagertKpiByTime, findTargetKpiByTimes, updateTargetKpiByTime, findAllTargetKpiByTimes } = require("./TargetKpiByTimeDataFunc");

// TODO: sửa lại cái function postBulkCreateTargetKpiByTime để sử dụng chung 1 function create là xong. bên mongoose k cần chia ra 2 phương thưc.
module.exports = {
    postCreateTargetKpiByTime: async (req, res) => {
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
        const objCreate = await createTargetKpiByTime(objInput.body);

        if (!objCreate) {
            return res.status(400).json({ message: "Không thể tạo mới!" })
        }
        return res.status(201).json({ message: "Tạo mới dữ liệu thành công!", data: objCreate })
    },

    postBulkCreateTargetKpiByTime: async (req, res) => {
        const objCreate = await createTargetKpiByTime(req.body)
        if (!objCreate.length) {
            return res.status(400).json({ message: "Không thể tạo mới!" })
        }
        return res.status(201).json({ message: "Tạo mới dữ liệu thành công!", data: objCreate })
    },
    getTargetKpiByTime: async (req, res) => {
        let objFind;
        if (req.query) {
            objFind = await findTargetKpiByTimes({ ...req.query })
        } else {
            objFind = await findAllTargetKpiByTimes();
        }
        return res.status(200).json({ message: "Tìm thông tin thành công!", data: objFind })
    },
    getFullInfoTargetKpyByTime: async (req, res) => {
        if (req.query.companyId) {
            const rawData = await findTargetKpiByTimes({ ...req.query });
            const targetInfo = await findTargetKpis({ _id: rawData.map(item => item.targetId).filter(filtered => {if(filtered) return filtered})})

            const targetType = await findTargetTypes({_id: targetInfo.map(item => item.calDescriptionId)});
            objFind = targetInfo.map(item => {
                let check = targetType.find(finder => finder._id == item.calDescriptionId);
                if(check){
                   return {
                    ...item,
                    type:check.type
                   }
                }else{
                    return{
                        ...item
                    }
                }
            })
            return res.status(200).json({ message: "Tìm thông tin thành công", data: objFind })
        } else {
            return res.status(400).json({ message: "Tìm thông tin không thành công!" })

        }
    },
    patchTargetKpiByTime: async (req, res) => {
        if (req.body && req.query.id) {
            updateRecord = await updateTargetKpiByTime(req.query.id, req.body);
            if (updateRecord) {
                return res.status(200).json({ message: "Update mục tiêu tổ chức thành công", data: updateRecord })
            }
            return res.status(400).json({ message: "Update mục tiêu tổ chức không thành công", data: req.query.id })
        }
        return res.status(400).json({ message: "Update mục tiêu tổ chức không thành công" })
    },
    deleteTargetKpiByTime: async (req, res) => {
        if(req.body._id){
            let deleteRecord = await deleteTagertKpiByTime({...req.body});
            if(deleteRecord.deletedCount){
                return res.status(200).json({message:"Xoá mục tiêu tổ chức thành công"})
            }
            return res.status(200).json({message:"Xoá mục tiêu tổ chức không thành công"})
        }
        return res.status(400).json({message:"Xoá mục tiêu tổ chức không thành công"})
    },
}