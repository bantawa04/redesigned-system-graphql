const faker = require("faker");

const createProduct = () => {
  const post = {
    id: Math.floor(Math.random() * 201),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    category: faker.commerce.department(),
  };

  return post;
};

exports.createProduct = createProduct;
