const TsConfigPathsPlugin = require("awesome-typescript-loader")
  .TsConfigPathsPlugin;

//const css = require("@zeit/next-css");

let config = {
  pageExtensions: ["tsx", "md", "mdx"],
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]"
  },
  webpack: (config, options) => {
    // Use the module name mappings in tsconfig so imports resolve properly.
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(new TsConfigPathsPlugin());
    return config;
  }
};
module.exports = config;
//module.exports = withPlugins([[css]], config);
