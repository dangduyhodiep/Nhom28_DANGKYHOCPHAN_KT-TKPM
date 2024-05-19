const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const URL = process.env.DB_MONGOOSE;

mongoose.connect(URL).then(() => {
    console.log("Connected to mongoDB")
});

const companyLevelStruct = new Schema({
    name: String,
    description: String,
    techName: String,
    level: Number,
    parentId: String,
    userCreate: String,
    userUpdate: String,
    isDiable: Boolean
}, { timestamps: true });
const companyLevelSchema = mongoose.model("company-level-struct", companyLevelStruct);

const companyStruct = new Schema({
    companyLevelStructId: String,
    techName: String,
    parentId: String,
    name: String,
    description: String,
    userCreate: String,
    userUpdate: String,
    isDiable: Boolean
}, { timestamps: true })
const companyStructSchema = mongoose.model("company-struct", companyStruct);

const timeCompanyKpi = new Schema({
    name: String,
    descirption: String,
    startTime: String,
    endTime: String,
    userCreate: String,
    userUpdate: String,
    isDiable: Boolean
}, { timestamps: true });
const timeCompanySchema = mongoose.model("time-company-kpi", timeCompanyKpi);

const targetKpi = new Schema({
    name: String,
    description: String,
    techName: String,
    level: String,
    // Mô tả phương pháp và công thức tính
    descriptionMethodCal: String,
    // Đơn vị tính:
    unit: String,
    unitDescription: String,
    // Tần suất đo
    frequencyMeasure: String,
    // Nguồn đo
    measureSourceId: String,
    parentId: String,
    // Phương pháp tính
    cal: String,
    // Loại phương pháp tính (Loại mục tiêu)
    calDescriptionId: String,
    // Chỉ tiêu
    defaultValue: Number,
    // Ngưỡng đạt
    minValue: Number,
    // Tỷ trọng
    weight: Number,
    note: String,
    isDiable: Boolean
}, { timestamps: true })
const targetKpiSchema = mongoose.model("target-kpi", targetKpi);

const targetType = new Schema({
    type: String,
    description: String,
    userCreate: String,
    userUpdate:String,
}, { timestamps: true });
const targetTypeSchema = mongoose.model("target-type", targetType);

const targetKpiByTime = new Schema({
    targetId: String,
    // timeCompanyKpiId: String,
    companyId: String,
    defaultValue: Number,
    minValue: Number,
    excuteValue: Number,
    note: String,
    userCreate: String,
    userUpdate: String
}, { timestamps: true });
const targetKpiByTimeSchema = mongoose.model("target-kpi-by-time", targetKpiByTime);

module.exports = {
    companyLevelSchema, companyStructSchema, timeCompanySchema, targetKpiSchema, targetKpiByTimeSchema, targetTypeSchema,
}
