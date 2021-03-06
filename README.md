## install

```bash
  npm i --save-dev add-asset-html-cdn-webpack-plugin
```

## Usage

base on [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) dynamic injection of cdn data to html template

**cdn.config.js**

```js
module.exports = {
  vue: '//cdn.bootcss.com/vue/2.5.16/vue.min.js',
  vueRouter: '//cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
  axios: '//cdn.bootcss.com/axios/0.18.0/axios.min.js',
  rxjs: '//cdn.bootcss.com/rxjs/5.5.6/Rx.min.js',
  'element-ui': '//cdn.bootcss.com/element-ui/2.3.7/index.js',
  theme: '//cdn.bootcss.com/element-ui/2.3.7/theme-chalk/index.css'
  app: {
    script: '//google/index.js',
    style: '//google/index.css'
  },
  login: {
    script: '//google/index.js',
    style: '//google/index.css'
  }
};
```
If the key value is a simple type, it will be used as a generic insert template, otherwise objects such as app(HtmlWebpackPlugin config chunks) will only insert in the corresponding template.

**webpack.config.js**

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlCdnWebpackPlugin = require('../index');
const cdnConfig = require('./cdn.config');

module.exports = {
  mode: 'production',
  entry: { index: path.resolve(__dirname, '../src/index.js') },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../src/index.html')
    }),
    new AddAssetHtmlCdnWebpackPlugin(true, cdnConfig)
  ]
};
```

## Options

|        Name        |    Type     | Default | Description                                                                                                                                                    |
| :----------------: | :---------: | :-----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[`isWork`](#)**  | `{Boolean}` | `true`  | does the plugin work                                                                                                               |
| **[`options`](#)** | `{Object}`  |  `{}`   | Key-value pair object like **cdn.config.js**
