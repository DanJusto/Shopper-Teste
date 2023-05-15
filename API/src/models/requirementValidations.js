const ProductRepository = require("../repositories/ProductRepository");

class RequirementValidations {
  
  validFields(id, newPrice) {
    if (!id || !newPrice) {
      return "Erro: código e novo preço são obrigatórios";
    }

    return "OK!";
  }

  async validExistProduct(id) {
    const productRepository = new ProductRepository;
    const data = await productRepository.findProductById(id);

    if (data[0].length === 0) {
      return "Erro: produto não encontrado";
    }

    return "OK!";
  }

  validFormat(newPrice) {
    if (isNaN(newPrice)) {
      return "Erro: preço precisa ser um número";
    }

    if (newPrice < 0) {
      return "Erro: formato não é válido, precisa ser positivo";
    }

    const regex = /^\d+(\.\d{1,2})?$/;
    const str = newPrice.toString();
    const result = regex.test(str)
    if (!result) {
      return "Erro: formato não é válido, necessário até duas casas decimais"
    }

    return "OK!";
  }
}

module.exports = RequirementValidations;