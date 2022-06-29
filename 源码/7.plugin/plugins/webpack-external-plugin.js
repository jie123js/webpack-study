const { ExternalModule } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * 这个插件需要以下的功能
 * 1. 收集项目 中的依赖模块，取和插件配置文件中的交集
 * 2. 修改外联模块的生产过程，把它们变成一个外部模块
 * 3. 修改产出的html文件，往 html里插入CDN脚本的url地址
 */
class WebpackExternalPlugin {
  constructor(options) {
    this.options = options;
    this.externalModules = Object.keys(this.options);//['jquery','lodash']
    this.importedModules = new Set();//存放项目中真正用到的模块  ['jquery','lodash']
  }
  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap('WebpackExternalPlugin', (normalModuleFactory) => {
      //parser是一个ast语法解析器的hookMap key是模块类型，javascript/auto 普通的JS模块，值是一个钩子

      normalModuleFactory.hooks.parser
        .for('javascript/auto')//如果有直接获取，如果没有则创建
        .tap('WebpackExternalPlugin', parser => {
          //statement import _ from 'lodash';  source=lodash
          parser.hooks.import.tap('WebpackExternalPlugin', (statement, source) => {
            if (this.externalModules.includes(source)) {
              this.importedModules.add(source);
            }
          });
          //require('jquery');
          parser.hooks.call.for('require').tap('WebpackExternalPlugin', (expression) => {
            let source = expression.arguments[0].value;//source=jquery
            if (this.externalModules.includes(source)) {
              this.importedModules.add(source);
            }
          });
        })
      //改造了生产模块的流程，发现如果导入的是一个外部模块，则我们负责生产一个外部模块返回，
      normalModuleFactory.hooks.factorize.tapAsync('WebpackExternalPlugin', (resolveData, callback) => {
        let { request } = resolveData;//要生产的模块
        //如果是我们可以处理的外部模块，则创建一个外部模块直接返回
        //arr.includes() set.has()
        if (this.externalModules.includes(request)) {
          let { varName } = this.options[request];
          callback(null, new ExternalModule(varName, 'window', request));
        } else {
          //否则 就是一个普通模块，就走正常生产模块的流程
          callback();
        }
      });
    });
    compiler.hooks.compilation.tap('WebpackExternalPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync('WebpackExternalPlugin', (htmlData, callback) => {
        Object.keys(this.options).filter(key => this.importedModules.has(key)).forEach(key => {
          htmlData.assetTags.scripts.unshift({
            tagName: 'script',
            voidTag: false,
            attributes: {
              defer: false,
              src: this.options[key].url
            }
          });
        });
        callback(null, htmlData);
      });
    });
  }
}
module.exports = WebpackExternalPlugin;