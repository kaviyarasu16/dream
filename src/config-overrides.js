// config-overrides.js
const path = require('path-browserify');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    path: path, // Polyfill for Node.js 'path' module in the browser
  };

  return config;
};
