const dbConnection = require("../database");

class ProductRepository {

  async findProductById(id) {
    const database = await dbConnection();

    const product = await database.promise().execute("SELECT * FROM products WHERE code = ?", [id]);

    database.end();

    return product;
  }

  async findPackByProductId(id) {
    const database = await dbConnection();

    const product = await database.promise().execute("SELECT * FROM packs WHERE product_id = ?", [id]);

    database.end();

    return product;
  }

  async findPackById(id) {
    const database = await dbConnection();

    const product = await database.promise().execute("SELECT * FROM packs WHERE pack_id = ?", [id]);

    database.end();

    return product;
  }

  async updateProduct(id, price) {
    const database = await dbConnection();

    const updatedProduct = await database.promise().execute(`
    UPDATE products SET
    sales_price = ?
    WHERE code = ?`,
    [price, id]);

    database.end();
    
    return updatedProduct;
  }

}

module.exports = ProductRepository;