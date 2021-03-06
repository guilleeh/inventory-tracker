const express = require("express");
const authController = require("../controllers/auth.controller");
const inventoryController = require("../controllers/inventory.controller");
const authorizeMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

// --- AUTH ROUTES ---
router.post("/sign-up", authController.postCreateUser);
router.post("/sign-in", authController.postLoginUser);
router.get("/me/:id", authorizeMiddleware.authorize, authController.getUser);

// --- REST INVENTORY ROUTES (PROTECTED) ---

// get all inventory of individual
router.get(
  "/inventory/:id",
  authorizeMiddleware.authorize,
  inventoryController.getAllInventory
);

// create a new item
router.post(
  "/item",
  authorizeMiddleware.authorize,
  inventoryController.postNewItem
);

// edit item

router.get(
  "/item/:id",
  authorizeMiddleware.authorize,
  inventoryController.getSingleItem
);

// edit item

router.put(
  "/item/:id",
  authorizeMiddleware.authorize,
  inventoryController.putItem
);

// delete item

router.post(
  "/item/:id",
  authorizeMiddleware.authorize,
  inventoryController.deleteItem
);

module.exports = router;
