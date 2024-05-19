const { createTimeCompanyKpi, disableTimeCompanyKpi, findTimeCompanyKpis,findAllTimeCompanyKpis, updateTimeCompanyKpi } = require("./TimeCompanyDataFunc");

module.exports = {
    postCreateTimeCompany: async (req, res) => {
        const objInput = {
            query: req.query,
            body: req.body,
        };

        if (!objInput.body.isDiable) {
            objInput.body.isDiable = false;
        }

        const objCreate = await createTimeCompanyKpi(objInput.body);

        if (!objCreate) {
            return res.status(400).json({ message: "Không thể tạo mới kỳ!" })
        }
        return res.status(201).json({ message: "Tạo mới kỳ thành công!", data: objCreate })
    },
    getTimeCompany: async (req, res) => {
        let objFind;
        if (req.query.id) {
            objFind = await findTimeCompanyKpis({ _id: req.query.id })
        } else {
            objFind = await findAllTimeCompanyKpis();
        }
        return res.status(200).json({ message: "Tìm thông tin kỳ thành công!", data: objFind })
    },
    patchTimeCompany: async (req, res) => {
        if(req.body && req.query.id){
            let updateRecord = await updateTimeCompanyKpi(req.query.id, req.body);
            if(updateRecord){
                return res.status(200).json({message:"Update mục tiêu tháng thành công", data:updateRecord})
            }
            return res.status(400).json({message:"Update mục tiêu tháng không thành công", data:req.query.id})
        }
        return res.status(400).json({message:"Update mục tiêu tháng không thành công"})
    },
    deleteTimeCompany: async (req, res) => {
        if(req.body._id){
            let deleteRecord = await deleteTimeCompanyKpi({...req.body});
            if(deleteRecord.deletedCount){
                return res.status(200).json({message:"Xoá mục tiêu tháng thành công"})
            }
            return res.status(200).json({message:"Xoá mục tiêu tháng không thành công"})
        }
        return res.status(400).json({message:"Xoá mục tiêu tháng không thành công"})
    }
}
