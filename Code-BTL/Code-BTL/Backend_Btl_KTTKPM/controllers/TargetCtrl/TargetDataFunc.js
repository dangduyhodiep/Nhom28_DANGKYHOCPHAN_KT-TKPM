const { targetKpiSchema } = require("../../database/dataConfig");

// Method to create a new document in target-kpi collection
const createTargetKpi = async (data) => {
  try {
    const document = await targetKpiSchema.create(data);
    return document;
  } catch (error) {
    console.error('Error creating Target Kpi document:', error);
    return {}
  }
};



// Method to find documents in target-kpi collection
const findTargetKpis = async (query) => {
  try {
    const documents = await targetKpiSchema.find(query).sort({ techName: -1 });
    return documents.map(mapped => ({
      _id: mapped._id,
      name: mapped.name,
      description: mapped.description,
      techName: mapped.techName,
      level: mapped.level,
      descriptionMethodCal: mapped.descriptionMethodCal,
      unit: mapped.unit,
      unitDescription: mapped.unitDescription,
      frequencyMeasure: mapped.frequencyMeasure,
      measureSourceId: mapped.measureSourceId,
      parentId: mapped.parentId,
      cal: mapped.cal,
      calDescriptionId: mapped.calDescriptionId,
      defaultValue: mapped.defaultValue,
      minValue: mapped.minValue,
      note: mapped.note,
      weight:mapped.weight,
      isDiable: mapped.isDiable,
      createdAt: mapped.createdAt,
      updatedAt: mapped.updatedAt
    }));
  } catch (error) {
    console.error('Error finding Target Kpi documents:', error);
    return []
  }
};

const findAllTargetKpis = async () => {
  try {
    const documents = await targetKpiSchema.find();
    return documents.map(mapped => ({
      _id: mapped._id,
      name: mapped.name,
      description: mapped.description,
      techName: mapped.techName,
      level: mapped.level,
      descriptionMethodCal: mapped.descriptionMethodCal,
      unit: mapped.unit,
      unitDescription: mapped.unitDescription,
      frequencyMeasure: mapped.frequencyMeasure,
      measureSourceId: mapped.measureSourceId,
      parentId: mapped.parentId,
      cal: mapped.cal,
      calDescriptionId: mapped.calDescriptionId,
      defaultValue: mapped.defaultValue,
      minValue: mapped.minValue,
      note: mapped.note,
      isDiable: mapped.isDiable,
      createdAt: mapped.createdAt,
      updatedAt: mapped.updatedAt
    }));
  } catch (error) {
    console.error('Error finding Target Kpi documents:', error);
    return {}
  }
};

// Method to update a document in target-kpi collection
const updateTargetKpi = async (id, update) => {
  try {
    const updatedDocument = await targetKpiSchema.findByIdAndUpdate(id, update, { new: true });
    return updatedDocument;
  } catch (error) {
    console.error('Error updating Target Kpi document:', error);
    throw error;
  }
};

// Method to disable a document in target-kpi collection
const disableTargetKpi = async (id) => {
  try {
    const updatedDocument = await targetKpiSchema.findByIdAndUpdate(
      id,
      { isDisable: true },
      { new: true }
    );
    return updatedDocument;
  } catch (error) {
    console.error('Error disabling Target Kpi document:', error);
    throw error;
  }
};

const deleteTargetKpi = async (id) => {
  try {
    const deleteDocument = await targetKpiSchema.deleteOne(id)
    return deleteDocument;
  } catch (e) {
    console.log(e);
    return {}
  }
}
module.exports = {
  createTargetKpi,
  findTargetKpis,
  findAllTargetKpis,
  updateTargetKpi,
  disableTargetKpi,
  deleteTargetKpi
};