var manifestJSON = require('./public/manifest.json');

pwaArgs = {
  themeColor: manifestJSON.theme_color,
  name: manifestJSON.short_name,
  msTileColor: manifestJSON.background_color
};

module.exports = {
  lintOnSave: false,
  baseUrl: process.env.NODE_ENV === 'production' ? '/daegmael-extended/' : '/',
  chainWebpack: config => {
    config.plugin('pwa').tap(args => [pwaArgs]);

    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => ({ ...options, limit: 6114, }));
  },
};
