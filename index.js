const path = require('path');

/**
 * 处理配置内容
 * @param {String} cdnPath        url地址
 * @param {Array} scriptContent   脚本容器
 * @param {Array} styleContent    样式容器
 */
function getContent(cdnPath, scriptContent, styleContent) {
  let ext = path.extname(cdnPath);
  if (ext === '.js') {
    scriptContent.push(
      `<script crossorigin type="text/javascript" src=${cdnPath}></script>`
    );
  } else if (ext === '.css') {
    styleContent.push(`<link href=${cdnPath} rel="stylesheet">`);
  }
}

/**
 * AddAssetHtmlCdn
 * @param {Boolean} isWork does the plugin work
 * @param {Object} options cdn config data
 */
function AddAssetHtmlCdn(isWork = true, options = {}) {
  this.isWork = isWork;
  this.options = options;
}

AddAssetHtmlCdn.prototype.apply = function(compiler) {
  let _this = this;
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function(
      htmlPluginData,
      callback
    ) {
      if (_this.isWork) {
        let cdnConfig = _this.options,
          scriptContent = [],
          styleContent = [],
          chunk = Object.keys(htmlPluginData.assets.chunks)[0];

        Object.keys(cdnConfig).map(item => {
          if (typeof cdnConfig[item] === 'object' && chunk === item) {
            Object.keys(cdnConfig[item]).map(pItem => {
              getContent(cdnConfig[item][pItem], scriptContent, styleContent);
            });
          } else if (typeof cdnConfig[item] !== 'object') {
            getContent(cdnConfig[item], scriptContent, styleContent);
          }
        });

        if (styleContent.length) {
          styleContent.push('</head>');
          htmlPluginData.html = htmlPluginData.html.replace(
            /<\/head>/,
            styleContent.join('')
          );
        }

        if (scriptContent.length) {
          scriptContent.push('</body>');
          htmlPluginData.html = htmlPluginData.html.replace(
            /<\/body>/,
            scriptContent.join('')
          );
        }

        console.log(`\nprocess ${htmlPluginData.outputName} cdn complete...\n`);
      }

      callback && callback(null, htmlPluginData);
    });
  });
};

module.exports = AddAssetHtmlCdn;
