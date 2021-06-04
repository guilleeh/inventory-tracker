const inventoryService = require("../services/inventory.service");
const auth = require("../services/auth.service");

const getAllInventory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const numId = Number(id);
    if (Number.isNaN(numId)) {
      res.status(400).json({ success: false, error: "Id must be a number." });
      return;
    }
    const items = await inventoryService.getAllInventoryItems(numId);
    res.status(200).json({ success: true, data: items });
    next();
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

const getSingleItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const numId = Number(id);
    if (Number.isNaN(numId)) {
      res.status(400).json({ success: false, error: "Id must be a number." });
      return;
    }
    const items = await inventoryService.getSingleInventoryItem(numId);
    res.status(200).json({ success: true, data: items });
    next();
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

const postNewItem = async (req, res, next) => {
  try {
    const { name, type, id, quantity } = req.body;
    const numId = Number(id);
    const quant = Number(quantity);
    if (Number.isNaN(numId)) {
      res.status(400).json({ success: false, error: "Id must be a number." });
      return;
    }
    if (Number.isNaN(quant)) {
      res
        .status(400)
        .json({ success: false, error: "Quantity must be a number." });
      return;
    }
    const user = await auth.getSingleUserById(numId);
    const email = user.email;
    const item = await inventoryService.createNewInventoryItem(
      name,
      type,
      quant,
      email
    );
    res.status(200).json({ success: true, data: item });
    next();
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

const putItem = async (req, res, next) => {
  try {
    const { name, type, id, quantity } = req.body;
    const numId = Number(id);
    const quant = Number(quantity);
    if (Number.isNaN(numId)) {
      res.status(400).json({ success: false, error: "Id must be a number." });
      return;
    }
    if (Number.isNaN(quant)) {
      res
        .status(400)
        .json({ success: false, error: "Quantity must be a number." });
      return;
    }
    const item = await inventoryService.editInventoryItem(
      name,
      type,
      quant,
      numId
    );
    res.status(200).json({ success: true, data: item });
    next();
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.body;
    const item = await inventoryService.deleteInventoryItem(id);
    res.status(200).json({ success: true, data: item });
    next();
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

module.exports = {
  getAllInventory,
  getSingleItem,
  postNewItem,
  putItem,
  deleteItem,
};
