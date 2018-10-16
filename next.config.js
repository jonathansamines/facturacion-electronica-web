const withSass = require('@zeit/next-sass')

module.exports = withSass({
  cssLoaderOptions: {
    url: false
  }
});
