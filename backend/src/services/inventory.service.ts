const inventoryDb = require("../db/inventory.db");

const getAllInventoryItems = async (id: number) => {
  try {
    return await inventoryDb.getAllInventoryItemsDb(id);
  } catch (e) {
    throw new Error(e.message);
  }
};

const createNewInventoryItem = async (
  name: string,
  type: string,
  email: string
) => {
  try {
    return await inventoryDb.createNewInventoryItemDb(name, type, email);
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getAllInventoryItems,
  createNewInventoryItem,
};
