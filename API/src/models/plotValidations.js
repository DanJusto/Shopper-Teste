const ProductRepository = require("../repositories/ProductRepository");

class PlotValidations {
  
  lowerThanCost(product, newPrice) {
    if (newPrice < parseFloat(product.cost_price)) {
      return "Proibido: valor é menor que o custo";
    }
    return "OK!";
  }

  readjustmentPercent(product, newPrice) {
    if (newPrice < (parseFloat(product.sales_price) * 0.9)|| newPrice > (parseFloat(product.sales_price) * 1.1)) {
      return "Proibido: valor de reajuste é maior ou menor que 10% do preço atual";
    }
    return "OK!";
  }

  async validProductPackPrices(product, newPrice) {
    const plotValidations = new PlotValidations;
    const productRepository = new ProductRepository;
    const dataPackProduct = await productRepository.findPackByProductId(product.code);
    const dataPackPack = await productRepository.findPackById(product.code);

    // Se for um produto que não possui pack, então já realizou as verificações e retorna OK!
    if (dataPackProduct[0].length === 0 && dataPackPack[0].length === 0) {
      return "OK!";
    }

    let pack;
    
    // Caso o produto componha apenas um pack, as validações realizadas já são suficientes. Note-se que não há na database packs diferentes com o mesmo produto. Caso houvesse, seria necessário mais uma validação.

    // Se existir mais de um produto no pack
    if(dataPackPack[0].length > 1) {

      // Armazena a diferença do preço atual e do novo preço
      const diffOfPrice = newPrice - parseFloat(product.sales_price);

      // Percorre pelos packs que possuem o produto
      for (let i=0; i<dataPackPack[0].length; i++) {

        // Pega as métricas e tira o percentual de composição do pack
        const dataProduct = await productRepository.findProductById(dataPackPack[0][i].product_id);
        const prod = dataProduct[0][0];
        const parcialPackPrice = (parseInt(dataPackPack[0][i].qty) * parseFloat(prod.sales_price));
        const percent = (parcialPackPrice / parseFloat(product.sales_price));

        // Armazena o valor de acordo com o percentual de composição do produto.
        const newProductPrice = parseFloat(prod.sales_price) + ((diffOfPrice * percent) / parseInt(dataPackPack[0][i].qty));

        // Realiza as validações para ver se o novo valor do produto que compõe o pack não infringe as regras de negócio.
        const validationOfCost = plotValidations.lowerThanCost(prod, newProductPrice);
        if (validationOfCost !== "OK!") {
          return "Proibido: valor do pack causa um valor do produto menor que o custo";
        }

        const validationOfReadjustment = plotValidations.readjustmentPercent(prod, newProductPrice);
        if (validationOfReadjustment !== "OK!") {
          return "Proibido: valor do pack causa um valor de reajuste do produto maior ou menor que 10% do preço atual";
        }
      }
    } 
    return "OK!";
  }
}

module.exports = PlotValidations;