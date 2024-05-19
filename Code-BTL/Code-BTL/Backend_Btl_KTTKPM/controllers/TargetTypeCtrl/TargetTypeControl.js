const { createTargetType, disableTargetType, findAllTargetTypes, findTargetTypes, updateTargetType, deleteTargetType } = require("./TargetTypeDataFunc");

module.exports = {
    postCreateTargetType: async (req, res) => {
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
        const objCreate = await createTargetType(objInput.body);

        if (!objCreate) {
            return res.status(400).json({ message: "Không thể tạo mới loại mục tiêu!" })
        }
        return res.status(201).json({ message: "Tạo mới mục loại tiêu thành công!", data: objCreate })
    },
    getTargetType: async (req, res) => {
        let objFind;
        if (req.query.id) {
            objFind = await findTargetTypes({ _id: req.query.id })
        } else {
            objFind = await findAllTargetTypes();
        }
        return res.status(200).json({ message: "Tìm thông tin loại mục tiêu thành công!", data: objFind })
    },
    patchTargetType: async (req, res) => {
        if(req.body && req.query.id){
            let updateRecord = await updateTargetType(req.query.id, req.body);
            if(updateRecord){
                return res.status(200).json({message:"Update loại mục tiêu thành công", data:updateRecord})
            }
            return res.status(400).json({message:"Update loại mục tiêu không thành công", data:req.query.id})
        }
        return res.status(400).json({message:"Update mục tiêu không thành công"})
    },
    deleteTargetType: async (req, res) => {
        if(req.body._id){
            let deleteRecord = await deleteTargetType({...req.body});
            if(deleteRecord.deletedCount){
                return res.status(200).json({message:"Xoá loại mục tiêu thành công"})
            }
            return res.status(200).json({message:"Xoá loại mục tiêu không thành công"})
        }
        return res.status(400).json({message:"Xoá loại mục tiêu không thành công"})
    }
}