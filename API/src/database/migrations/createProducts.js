const createProducts = `
  CREATE TABLE IF NOT EXISTS products 
  ( 
    code bigint PRIMARY KEY, # CODIGO DO PRODUTO 
    name varchar(100) NOT NULL, # NOME DO PRODUTO
    cost_price decimal(9,2) NOT NULL, # CUSTO DO PRODUTO
    sales_price decimal(9,2) NOT NULL # PRECO DE VENDA DO PRODUTO
  );
`;

module.exports = createProducts;