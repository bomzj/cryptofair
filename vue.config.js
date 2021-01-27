module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    devtool: 'source-map'
  },
  pages: {
    offers: {
      // entry for the page
      entry: 'src/offer/offer-list-page.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'P2P Crypto Exchanges Aggregator ₿ (Best Prices 2021)',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'offers']
    }
  }
}