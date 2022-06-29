
class WebpackHashPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.compilation.tap('WebpackHashPlugin', (compilation) => {
      compilation.hooks.afterHash.tap('WebpackHashPlugin', () => {
        console.log('hash', compilation.hash);
        compilation.hash = 'newHash';
        for (let chunk of compilation.chunks) {
          console.log('chunkHash', chunk.hash);
          chunk.renderedHash = 'newChunkHash';
          console.log('contentHash', chunk.contentHash);
          chunk.contentHash = {
            'javascript': 'newJSContentHash',
            'css/mini-extract': 'newCSSContentHash'
          }
        }
      });
    });
  }
}
module.exports = WebpackHashPlugin;