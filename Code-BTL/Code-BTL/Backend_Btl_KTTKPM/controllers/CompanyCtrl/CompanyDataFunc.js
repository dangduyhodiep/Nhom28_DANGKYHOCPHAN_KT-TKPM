const { companyStructSchema } = require("../../database/dataConfig");

// Method to create a new document in company-struct collection
const createCompanyStruct = async (data) => {
  try {
    const document = await companyStructSchema.create(data);
    return document;
  } catch (error) {
    console.error('Error creating Company Struct document:', error);
    return {};
    throw error;
  }
};

// Method to find documents in company-struct collection
const findCompanyStructs = async (query) => {
  try {
    const documents = await companyStructSchema.find(query);
    return documents;
  } catch (error) {
    console.error('Error finding Company Struct documents:', error);
    return {};
    throw error;
  }
};

const findAllCompanyStructs = async () => {
  try {
    const documents = await companyStructSchema.find();
    return documents.map(item => ({
      _id: item._id,
      companyLevelStructId: item.companyLevelStructId,
      techName: item.techName,
      parentId: item.parentId,
      name: item.name,
      description: item.description,
      userCreate: item.userCreate,
      userUpdate: item.userUpdate,
      isDiable: item.isDiable,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }));
  } catch (error) {
    console.error('Error finding Company Struct documents:', error);
    return {};
    throw error;
  }
}
// Method to update a document in company-struct collection
const updateCompanyStruct = async (id, update) => {
  try {
    const updatedDocument = await companyStructSchema.findByIdAndUpdate(id, update, { new: true });
    return updatedDocument;
  } catch (error) {
    console.error('Error updating Company Struct document:', error);
    throw error;
  }
};

// Method to disable a document in company-struct collection
const disableCompanyStruct = async (id) => {
  try {
    const updatedDocument = await companyStructSchema.findByIdAndUpdate(
      id,
      { isDisable: true },
      { new: true }
    );
    return updatedDocument;
  } catch (error) {
    console.error('Error disabling Company Struct document:', error);
    throw error;
  }
};

const deleteCompanyStruct = async (id) => {
  try {
    const deleteDocument = await companyStructSchema.deleteOne(id)
    return deleteDocument;
  } catch (e) {
    console.log(e);
    return {}
  }
}

module.exports = {
  createCompanyStruct,
  findCompanyStructs,
  findAllCompanyStructs,
  updateCompanyStruct,
  disableCompanyStruct,
  deleteCompanyStruct
};