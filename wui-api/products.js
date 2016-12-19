var faker = require('faker');

function generateProducts() {
  var categories = [];
  var products = [];

  for (var cid = 0; cid < 10; cid++) {
    categories.push({
      id: cid,
      name: faker.commerce.productAdjective(),
    });
    for (var id = 0; id < 50; id++) {
      products.push({
        category: cid,
        id: id,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        current: faker.commerce.price(),
        picture: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2523421851,1617129705&fm=80'
      });
    }
  }

  return {
    products: products,
    categories: categories
  };
}

module.exports = generateProducts;
