const createPacks = `
  CREATE TABLE IF NOT EXISTS packs 
  (
    id bigint AUTO_INCREMENT PRIMARY KEY, # id primario da tabela
    pack_id bigint NOT NULL,  # id do produto pack 
    product_id bigint NOT NULL, # id do produto componente
    qty bigint NOT NULL, # quantidade do produto componente no pack
    CONSTRAINT FOREIGN KEY (pack_id) REFERENCES products(code),
    CONSTRAINT FOREIGN KEY (product_id) REFERENCES products(code)
  );
`;

module.exports = createPacks;