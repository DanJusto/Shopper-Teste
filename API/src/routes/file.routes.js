const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const FileController = require("../controller/fileController");

const fileController = new FileController();
const upload = multer(uploadConfig.MULTER);
const fileRouter = Router();

fileRouter.post("/", upload.single("file"), fileController.saveFile);

module.exports = fileRouter;