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

const postNewItem = async (req, res, next) => {
  try {
    const { name, type, id } = req.body;
    const user = await auth.getSingleUserById(id);
    const email = user.email;
    const item = await inventoryService.createNewInventoryItem(
      name,
      type,
      email
    );
    res.status(200).json({ success: true, data: item });
    next();
  } catch (e) {
    res.sendStatus(500) && next(e);
  }
};

module.exports = {
  getAllInventory,
  postNewItem,
};
