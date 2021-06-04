const inventoryDb = require("../db/inventory.db");

const getAllInventoryItems = async (id: number) => {
  try {
    return await inventoryDb.getAllInventoryItemsDb(id);
  } catch (e) {
    throw new Error(e.message);
  }
};

const getSingleInventoryItem = async (id: number) => {
  try {
    return await inventoryDb.getSingleInventoryItemDb(id);
  } catch (e) {
    throw new Error(e.message);
  }
};

const createNewInventoryItem = async (
  name: string,
  type: string,
  quantity: number,
  email: string
) => {
  try {
    return await inventoryDb.createNewInventoryItemDb(
      name,
      type,
      quantity,
      email
    );
  } catch (e) {
    throw new Error(e.message);
  }
};

const editInventoryItem = async (
  name: string,
  type: string,
  quantity: number,
  id: number
) => {
  try {
    return await inventoryDb.editInventoryItemDb(name, type, quantity, id);
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteInventoryItem = async (id: number) => {
  try {
    return await inventoryDb.deleteInventoryItemDb(id);
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getAllInventoryItems,
  getSingleInventoryItem,
  createNewInventoryItem,
  editInventoryItem,
  deleteInventoryItem,
};
