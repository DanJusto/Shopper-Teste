const AppError = require("../utils/AppError");
const DiskStorage = require("../utils/DiskStorage");

class FileController {
  async saveFile(request, response) {
    const { file } = request;
    const diskStorage = new DiskStorage;

    // Salva o arquivo csv na pasta tmp/uploads
    try {
      await diskStorage.saveFile(file.filename);
    } catch (error) {
      throw new AppError("Falha ao receber o arquivo. Verifique se o arquivo é um .csv");
    }
    return response.json();
  }

}

module.exports = FileController;