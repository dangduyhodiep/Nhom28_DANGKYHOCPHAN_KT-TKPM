const { targetTypeSchema } = require('../../database/dataConfig'); // Replace with the actual path to your model file

// Method to create a new document in target-type collection
const createTargetType = async (data) => {
    try {
        const document = await targetTypeSchema.create(data);
        return document;
    } catch (error) {
        console.error('Error creating Target Type document:', error);
        return {};
        throw error;
    }
};

// Method to find documents in target-type collection
const findTargetTypes = async (query) => {
    try {
        const documents = await targetTypeSchema.find(query);
        return documents;
    } catch (error) {
        console.error('Error finding Target Type documents:', error);
        return {};
        throw error;
    }
};

const findAllTargetTypes = async () => {
    try {
        const documents = await targetTypeSchema.find();
        return documents;
    } catch (error) {
        console.error('Error finding Target Type documents:', error);
        return [];
        throw error;
    }
};

// Method to update a document in target-type collection
const updateTargetType = async (id, update) => {
    try {
        const updatedDocument = await targetTypeSchema.findByIdAndUpdate(id, update, { new: true });
        return updatedDocument;
    } catch (error) {
        console.error('Error updating Target Type document:', error);
        throw error;
    }
};

// Method to disable a document in target-type collection
const disableTargetType = async (id) => {
    try {
        const updatedDocument = await targetTypeSchema.findByIdAndUpdate(
            id,
            { isDisable: true },
            { new: true }
        );
        return updatedDocument;
    } catch (error) {
        console.error('Error disabling Target Type document:', error);
        throw error;
    }
};
const deleteTargetType = async (id) => {
    try {
        const deleteDocument = await targetTypeSchema.deleteOne(id)
      return deleteDocument;
    } catch (error) {
      throw error;
    }
  };
module.exports = {
    createTargetType,
    findTargetTypes,
    findAllTargetTypes,
    updateTargetType,
    disableTargetType,
    deleteTargetType
};