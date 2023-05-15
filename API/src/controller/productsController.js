const PlotValidations = require("../models/plotValidations");
const RequirementValidations = require("../models/requirementValidations")
const ProductRepository = require("../repositories/ProductRepository");
const ProductAtualization = require("../models/productAtualization");
const ProductError = require("../models/productError");
const DiskStorage = require("../utils/DiskStorage");
const neatCsv = require("neat-csv");
const fs = require("fs");

class ProductsController {
  async validate(request, response) {

    const productRepository = new ProductRepository;
    const plotValidations = new PlotValidations;
    const requirementValidations = new RequirementValidations;
    const listProducts = [];
    
    //lê e armazena na variável list o arquivo csv salvo pelo fileController.
    fs.readFile("./tmp/uploads/file.csv", async (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      const list = await neatCsv(data);

      //executa as validações percorrendo cada uma das linhas do arquivo csv
      for(let i=0; i<list.length; i++) {
      
        let validation = "OK!";
        
        // três blocos de validações sobre os dados em si (campos, existência do produto, formato). Caso exista algum erro, armazena o erro na lista de retorno.
        const validationOfFiels = requirementValidations.validFields(list[i].product_code, list[i].new_price);
        if (validationOfFiels !== "OK!") {
          validation = validationOfFiels;
          const productToUpdate = new ProductError(list[i].product_code, list[i].new_price, validation);
          listProducts.push(productToUpdate);
          continue;
        }
  
        const validationOfExistingProduct = await requirementValidations.validExistProduct(list[i].product_code);
        if (validationOfExistingProduct !== "OK!") {
          validation = validationOfExistingProduct;
          const productToUpdate = new ProductError(list[i].product_code, list[i].new_price, validation);
          listProducts.push(productToUpdate);
          continue;
        }
  
        const validationOfFormat = requirementValidations.validFormat(list[i].new_price);
        if (validationOfFormat !== "OK!") {
          validation = validationOfFormat;
          const productToUpdate = new ProductError(list[i].id, list[i].new_price, validation);
          listProducts.push(productToUpdate);
          continue;
        }
  
        //validado o item, busca o produto e armazena na variavel product
        const data = await productRepository.findProductById(list[i].product_code);
        const product = data[0][0];
  
        // três blocos de validações sobre as regras de negócio (valor abaixo do custo, reajuste maior ou menos de 10%, conflito de preços entre packs e produtos)
        if (validation === "OK!") {
          const validationOfCost = plotValidations.lowerThanCost(product, list[i].new_price);
          if (validationOfCost !== "OK!") {
            validation = validationOfCost;
          }
        }
        if (validation === "OK!") {
          const validationOfReadjustment = plotValidations.readjustmentPercent(product, list[i].new_price);
          if (validationOfReadjustment !== "OK!") {
            validation = validationOfReadjustment;
          }
        }
        if (validation === "OK!") {
          const validationOfConflitPrices = await plotValidations.validProductPackPrices(product, list[i].new_price);
          if (validationOfConflitPrices !== "OK!") {
            validation = validationOfConflitPrices;
          }
        }
        
        // Com todas as validações feitas, salva as informações em conjunto com a mensagem de validação e armazena na lista de retorno.
        const productToUpdate = new ProductAtualization(product.code, product.name, product.sales_price, list[i].new_price, validation);
        listProducts.push(productToUpdate);
      };
      
      // verifica se todos os itens estão Ok!
      const valid = listProducts.every(elemento => elemento.validation === "OK!");
      
      return response.json({valid, listProducts});
    });
  };

  async update(request, response) {
    
    const diskStorage = new DiskStorage;
    const productRepository = new ProductRepository;

    //lê e armazena na variável list o arquivo csv salvo pelo fileController e apenas se todas as validações estão OK!.
    fs.readFile("./tmp/uploads/file.csv", async (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      const list = await neatCsv(data);

      // Percorre os itens do arquivo e salva as atualizações de valor em cada um
      for(let i=0; i<list.length; i++) {
        const dataPackProduct = await productRepository.findPackByProductId(list[i].product_code);
        const dataPackPack = await productRepository.findPackById(list[i].product_code);

        // Se for um produto que não possui pack
        if (dataPackProduct[0].length === 0 && dataPackPack[0].length === 0) {
          await productRepository.updateProduct(list[i].product_code, list[i].new_price);
          continue;
        }

        // Se for um produto que compõe um pack
        if (list[i].product_code < 1000) {
          const dataProduct = await productRepository.findProductById(list[i].product_code);
          const dataPack = await productRepository.findProductById(dataPackProduct[0][0].pack_id);
          const product = dataProduct[0][0];
          const pack = dataPack[0][0];

          const diffPrice = list[i].new_price - parseFloat(product.sales_price);
          const diffPackPrice = parseInt(dataPackProduct[0][0].qty) * diffPrice;
          const newPackPrice = parseFloat(pack.sales_price) + diffPackPrice;

          await productRepository.updateProduct(list[i].product_code, list[i].new_price);
          await productRepository.updateProduct(pack.code, newPackPrice);
          continue;

        } 
        // Se for um produto que é um pack
        else {

          // Caso esse pack seja composto de apenas um tipo de produto
          if (dataPackPack[0].length === 1) {

            const pack = dataPackPack[0][0];
            const dataProduct = await productRepository.findProductById(pack.product_id);
            const product = dataProduct[0][0];

            const newProductPrice = list[i].new_price / parseInt(pack.qty);

            await productRepository.updateProduct(product.code, newProductPrice);
            await productRepository.updateProduct(list[i].product_code, list[i].new_price);
            continue;

          } 
          // Caso esse pack seja composto de mais de um tipo de produto
          else {

            const dataProductPack = await productRepository.findProductById(list[i].product_code);
            const productPack = dataProductPack[0][0];
            const packs = dataPackPack[0];
            const diffOfPrice = list[i].new_price - parseFloat(productPack.sales_price);

            for (let i=0; i<packs.length; i++) {

              const dataProduct = await productRepository.findProductById(packs[i].product_id);
              const product = dataProduct[0][0];

              const parcialPackPrice = (parseInt(packs[i].qty) * parseFloat(product.sales_price));
              const percent = (parcialPackPrice / parseFloat(productPack.sales_price));

              const newProductPrice = parseFloat(product.sales_price) + ((diffOfPrice * percent) / parseInt(packs[i].qty));

              await productRepository.updateProduct(product.code, newProductPrice);
            }
            
            await productRepository.updateProduct(list[i].product_code, list[i].new_price);
            continue;

          }
        }
      };
    });

    // apaga o arquivo csv.
    await diskStorage.deleteFile("file.csv");

    return response.json();
  };
};

module.exports = ProductsController;