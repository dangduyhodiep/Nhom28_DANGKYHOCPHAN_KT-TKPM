const { timeCompanySchema } = require("../../database/dataConfig");

// Method to create a new document in time-company-kpi collection
const createTimeCompanyKpi = async (data) => {
  try {
    const document = await timeCompanySchema.create(data);
    return document;
  } catch (error) {
    console.error('Error creating Time Company Kpi document:', error);
    return {}
    throw error;
  }
};

// Method to find documents in time-company-kpi collection
const findTimeCompanyKpis = async (query) => {
  try {
    const documents = await timeCompanySchema.find(query);
    return documents;
  } catch (error) {
    return {}
    throw error;
  }
};

const findAllTimeCompanyKpis = async () => {
    try {
      const documents = await timeCompanySchema.find();
      return documents;
    } catch (error) {
        return []
      throw error;
    }
  };
// Method to update a document in time-company-kpi collection
const updateTimeCompanyKpi = async (id, update) => {
  try {
    const updatedDocument = await timeCompanySchema.findByIdAndUpdate(id, update, { new: true });
    return updatedDocument;
  } catch (error) {
    throw error;
  }
};

// Method to disable a document in time-company-kpi collection
const disableTimeCompanyKpi = async (id) => {
  try {
    const updatedDocument = await timeCompanySchema.findByIdAndUpdate(
      id,
      { isDisable: true },
      { new: true }
    );
    return updatedDocument;
  } catch (error) {
    throw error;
  }
};

const deleteTimeCompanyKpi = async (id) => {
  try {
      const deleteDocument = await timeCompanySchema.deleteOne(id)
    return deleteDocument;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTimeCompanyKpi,
  findTimeCompanyKpis,
  findAllTimeCompanyKpis,
  updateTimeCompanyKpi,
  disableTimeCompanyKpi,
  deleteTimeCompanyKpi
};
