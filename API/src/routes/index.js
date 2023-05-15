const { Router } = require("express");

const productsRoutes = require("./products.routes");
const fileRoutes = require("./file.routes");

const routes = Router();
routes.use("/products", productsRoutes);
routes.use("/file", fileRoutes);

module.exports = routes;