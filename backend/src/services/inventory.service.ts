const inventoryDb = require("../db/inventory.db");
const authDB = require("../db/auth.db");
const emailLib = require("../lib/email");

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
    if (quantity === 0) {
      // delete the item
      const item = await inventoryDb.deleteInventoryItemDb(id);
      const user = await authDB.getSingleUserByIdDb(item.userId);
      // send email
      try {
        await emailLib.sendEmail(
          user.email,
          "Your item has been deleted!",
          `Your item: ${item.name}, has been deleted.`
        );
      } catch (e) {
        console.log(e);
      }
      return item;
    }
    const item = await inventoryDb.editInventoryItemDb(
      name,
      type,
      quantity,
      id
    );
    return item;
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteInventoryItem = async (id: number) => {
  try {
    const item = await inventoryDb.deleteInventoryItemDb(id);
    const user = await authDB.getSingleUserByIdDb(item.userId);
    // send email
    try {
      await emailLib.sendEmail(
        user.email,
        "Your item has been deleted!",
        `Your item: ${item.name}, has been deleted.`
      );
    } catch (e) {
      console.log(e);
    }
    return item;
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
