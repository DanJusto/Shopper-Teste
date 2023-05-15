const { Router } = require("express");

const ProductsController = require("../controller/productsController");

const productsController = new ProductsController();
const productsRouter = Router();

productsRouter.get("/", productsController.validate);
productsRouter.put("/", productsController.update);

module.exports = productsRouter;