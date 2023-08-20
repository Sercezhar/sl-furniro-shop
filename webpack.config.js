const config = {
  mode: 'production',
  entry: {
    app: './src/js/app.js',
    shop: './src/js/shop.js',
  },
  output: {
    filename: '[name].min.js',
  },
};

module.exports = config;