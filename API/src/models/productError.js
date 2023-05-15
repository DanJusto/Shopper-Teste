class ProductError {
  
  constructor(id, newPrice, validation) {
    this.code = id;
    this.newPrice = newPrice;
    this.validation = validation;
  }
  
}

module.exports = ProductError