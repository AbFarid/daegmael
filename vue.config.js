var manifestJSON = require("./public/manifest.json");

pwaArgs = {
  themeColor: manifestJSON.theme_color,
  name: manifestJSON.short_name,
  msTileColor: manifestJSON.background_color
};

module.exports = {
  lintOnSave: false,
  baseUrl: process.env.NODE_ENV === 'production' ? '/daegmael/' : '/',
  chainWebpack: config => {
    config.plugin("pwa").tap(args => {
      return [pwaArgs];
    });
  }
};