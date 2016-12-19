var Handlebars = require('handlebars/runtime');

Handlebars.registerHelper('compare', function (v1, v2, options) {
  if (v1 > v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper('equal', function (v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper('dividedIndex', function (v1, v2, options) {
  var v3 = (v1 + 1) % v2;
  if (v3 === 0) {
    return options.fn(this);
  }
  return options.inverse(this);
});