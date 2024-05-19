const { targetKpiByTimeSchema } = require("../../database/dataConfig");

// Method to create a new document in target-kpi-by-time collection
const createTargetKpiByTime = async (data) => {
  try {
    const document = await targetKpiByTimeSchema.create(data);
    return document;
  } catch (error) {
    console.error('Error creating Target Kpi By Time document:', error);
return {};
  }
};

// Method to find documents in target-kpi-by-time collection
const findTargetKpiByTimes = async (query) => {
  try {
    const documents = await targetKpiByTimeSchema.find(query);
    return documents;
  } catch (error) {
    console.error('Error finding Target Kpi By Time documents:', error);
    return {}
  }
};

const findAllTargetKpiByTimes = async () => {
  try {
    const documents = await targetKpiByTimeSchema.find();
    return documents;
  } catch (error) {
    console.error('Error finding Target Kpi By Time documents:', error);
    return []
  }
};

// Method to update a document in target-kpi-by-time collection
const updateTargetKpiByTime = async (id, update) => {
  try {
    const updatedDocument = await targetKpiByTimeSchema.findByIdAndUpdate(id, update, { new: true });
    return updatedDocument;
  } catch (error) {
    console.error('Error updating Target Kpi By Time document:', error);
    throw error;
  }
};

// Method to disable a document in target-kpi-by-time collection
const disableTargetKpiByTime = async (id) => {
  try {
    const updatedDocument = await targetKpiByTimeSchema.findByIdAndUpdate(
      id,
      { isDisable: true },
      { new: true }
    );
    console.log('Target Kpi By Time document disabled:', updatedDocument);
    return updatedDocument;
  } catch (error) {
    console.error('Error disabling Target Kpi By Time document:', error);
    throw error;
  }
};
const deleteTagertKpiByTime = async (id) => {
  try {
    const deleteDocument = await targetKpiByTimeSchema.deleteOne(id)
    return deleteDocument;
  } catch (e) {
    console.log(e);
    return {}
  }
};

module.exports = {
  createTargetKpiByTime,
  findTargetKpiByTimes,
  updateTargetKpiByTime,
  findAllTargetKpiByTimes,
  disableTargetKpiByTime,
  deleteTagertKpiByTime
};