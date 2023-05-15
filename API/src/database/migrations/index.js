const dbConnection = require("../index");
const createProducts = require("./createProducts");
const createPacks = require("./createPacks");
const seedProducts = require("./seedProducts");
const seedPacks = require("./seedPacks");

// Cria as tabelas, caso não existam, e alimenta-as com os dados pré-informados. Caso queira verificar os logs, basta retirar o comentário na criação de tabela.
async function migrationsRun() {
  const db = await dbConnection();

  db.promise().execute(createProducts);
  db.promise().execute(createPacks);

  // Valida se há algum item na tabela produto e, caso esteja vazia, alimenta-a com os dados pré-informados.
  const testProductsToSeed = await db.promise().execute('SELECT * FROM products LIMIT 3');
  if (testProductsToSeed[0].length === 0) {
    db.promise().query("INSERT INTO products (code, name, cost_price, sales_price) VALUES ?", [seedProducts]).then(([rows]) => {
      console.log(rows);
    });
  };

  // Valida se há algum item na tabela produto e, caso esteja vazia, alimenta-a com os dados pré-informados.
  const testPacksToSeed = await db.promise().execute('SELECT * FROM packs LIMIT 3');
  if (testPacksToSeed[0].length === 0) {
    db.promise().query("INSERT INTO packs (pack_id, product_id, qty) VALUES ?", [seedPacks]).then(([rows]) => {
      console.log(rows);
    });
  };

}

module.exports = migrationsRun;