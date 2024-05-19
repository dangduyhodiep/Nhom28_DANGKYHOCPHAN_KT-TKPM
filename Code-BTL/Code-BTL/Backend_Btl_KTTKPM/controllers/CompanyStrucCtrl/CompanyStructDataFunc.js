const { companyLevelSchema } = require("../../database/dataConfig");

// Method to create a new document in company-level-struct collection
const createCompanyLevel = async (data) => {
  try {
    const document = await companyLevelSchema.create(data);
    return document;
  } catch (error) {
    console.error('Error creating Company Level document:', error);
    throw error;
  }
};

// Method to find documents in company-level-struct collection
const findCompanyLevels = async (query) => {
  try {
    const documents = await companyLevelSchema.find(query);
    return documents;
  } catch (error) {
    console.error('Error finding Company Level documents:', error);
    return {};
  }
};

const findAllCompanyLevels = async () => {
  try {
    const documents = await companyLevelSchema.find();
    return documents;
  } catch (e) {
    console.error('Error find all Company Level documents:', error);
    return [];
  }
}

const findAllCompanyLevelsByLevels = async () => {
  try {
    const documents = await companyLevelSchema.find();
    return documents.map(item => ({
      _id: item._id,
      name: item.name,
      description: item.description,
      techName: item.techName,
      level: item.level,
      parentId: item.parentId,
      userCreate: item.userCreate,
      userUpdate: item.userUpdate,
      isDiable: item.isDiable,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
  } catch (e) {
    console.log(e)
    return []
  }
}

// Method to update a document in company-level-struct collection
const updateCompanyLevel = async (id, update) => {
  try {
    const updatedDocument = await companyLevelSchema.findByIdAndUpdate(id, update, { new: true });
    console.log('Company Level document updated:', updatedDocument);
    return updatedDocument;
  } catch (error) {
    console.error('Error updating Company Level document:', error);
    throw error;
  }
};

// Method to disable a document in company-level-struct collection
const disableCompanyLevel = async (id) => {
  try {
    const updatedDocument = await companyLevelSchema.findByIdAndUpdate(
      id,
      { isDisable: true },
      { new: true }
    );
    console.log('Company Level document disabled:', updatedDocument);
    return updatedDocument;
  } catch (error) {
    console.error('Error disabling Company Level document:', error);
    throw error;
  }
};

module.exports = {
  createCompanyLevel,
  findCompanyLevels,
  updateCompanyLevel,
  findAllCompanyLevels,
  findAllCompanyLevelsByLevels,
  disableCompanyLevel
};