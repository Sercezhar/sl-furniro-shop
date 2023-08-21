const config = {
  mode: 'production',
  entry: {
    app: './src/js/app.js',
    shop: './src/js/shop.js',
    contact: './src/js/contact.js',
  },
  output: {
    filename: '[name].min.js',
  },
};

module.exports = config;
