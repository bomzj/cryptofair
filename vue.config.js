module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  pages: {
    home: {
      // entry for the page
      entry: 'src/intro/home-page.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Home',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'home']
    },
    offers: {
      // entry for the page
      entry: 'src/offer/offer-list-page.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'offers.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Offers',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'offers']
    },
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    news: 'src/empty-page.js',
    exchanges: 'src/empty-page.js',
    coins: 'src/empty-page.js',
    wallets: 'src/empty-page.js'
  }
}