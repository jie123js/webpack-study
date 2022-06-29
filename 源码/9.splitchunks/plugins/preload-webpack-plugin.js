const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * 1.查找当前产出代码块有哪些异步代码块
 * 2.针对每个异步代码块生成一个link标签
 * 3.把生成的link标签插入到结果的HTML文件中
 */
class PreloadWebpackPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    //<link href="title.js" rel="prefetch"></link><
    compiler.hooks.compilation.tap('PreloadWebpackPlugin', (compilation) => {
      //在准备生成资源标签之前执行
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        'PreloadWebpackPlugin',
        (htmlData, callback) => {
          this.generateLinks(compilation, htmlData, callback);
        }
      );
    });
    compiler.hooks.compilation.tap('PreloadWebpackPlugin', (compilation) => {
      //在准备生成资源标签之前执行
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tap(
        'PreloadWebpackPlugin',
        (htmlData) => {
          const { resourceHints } = this;
          if (resourceHints) {
            htmlData.assetTags.styles = [
              ...resourceHints,
              ...htmlData.assetTags.styles
            ]
          }
          return htmlData;
        }
      );
    });

  }
  generateLinks(compilation, htmlData, callback) {
    const { rel, include } = this.options;
    //本次编译产出的代码块
    let chunks = [...compilation.chunks];
    //如果说包括的是异步的代码块
    if (include === undefined || include === 'asyncChunks') {
      //如果chunk.canBeInitial()为true,说明这是一个入口代码块 main.canBeInitial()
      //过滤一下，只留下异步代码块
      chunks = chunks.filter(chunk => !chunk.canBeInitial());
    }
    let allFiles = chunks.reduce((accumulated, chunk) => {
      return accumulated.add(...chunk.files);
    }, new Set());
    console.log(allFiles);
    const links = [];
    for (const file of allFiles.values()) {
      links.push({
        tagName: 'link',
        attributes: {
          rel,//preload prefetch
          href: file
        }
      });
    }
    this.resourceHints = links;
    callback()
  }
}

module.exports = PreloadWebpackPlugin;