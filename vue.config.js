var manifestJSON = require('./public/manifest.json');

var pwaArgs = {
  themeColor: manifestJSON.theme_color,
  name: manifestJSON.short_name,
  msTileColor: manifestJSON.background_color
};

module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/daegmael-extended/' : '/',
  chainWebpack: config => {
    config.plugin('pwa').tap(args => [pwaArgs]);
  },
};
