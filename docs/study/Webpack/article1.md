# Webpack 

## Webpack 的构建流程

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有的配置的插件，执行对象的 run 方法开始执行编译
3. 确定入口：根据配置中的 entry 找出所有的入口文件
4. 编译模块：从入口文件出发，调用所有配置的 loader 对模块进行编译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了处理
5. 完成模块编译：在经过 loader 对于模块的编译后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
6. 输出资源：根据入口和模块之间的依赖关系，组成一个个包含多个模块的 chunk，再把每个 chunk 转换成一个单独的文件加入到输出列表，这一步是可以修改输出内容的最后机会
7. 输出完成：在确定好输出内容之后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

Webpack 会在特定的时间广播出特定的事件，plugin 在监听到相应的事件后会执行特定的逻辑，并且可以调用 Webpack 提供的 API 改变运行结果

```js
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var webpack = require('webpack');
var path = require('path');

var basePath = __dirname;

module.exports = {
  context: path.join(basePath, "src"),
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  entry: ['@babel/polyfill',    //ployfill兼容性更好
          './main.tsx'
         ],
  output: {
    path: path.join(basePath, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist', // Content base
    inline: true, // Enable watch and live reload
    host: 'localhost',
    port: 8082,
    stats: 'errors-only'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true,
          "babelCore": "@babel/core", // needed for Babel v7
        },        
      },    
      {
        test: /\.css$/,        
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/img/[name].[ext]?[hash]'
        }
      },
   ],
  },
  plugins: [
    //Generate index.html in /dist => ￼https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html', //Name of template in ./src
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ],  
};
```

Entry：指定webpack开始构建的入口模块，从该模块开始构建并计算出直接或间接依赖的模块或者库

Output：告诉webpack如何命名输出的文件以及输出的目录

Loaders：由于webpack只能处理javascript，所以我们需要对一些非js文件处理成webpack能够处理的模块，比如sass文件

Plugins：`Loaders`将各类型的文件处理成webpack能够处理的模块，`plugins`有着很强的能力。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。但也是最复杂的一个。比如对js文件进行压缩优化的`UglifyJsPlugin`插件

Chunk：coding split的产物，我们可以对一些代码打包成一个单独的chunk，比如某些公共模块，去重，更好的利用缓存。或者按需加载某些功能模块，优化加载时间。在webpack3及以前我们都利用`CommonsChunkPlugin`将一些公共代码分割成一个chunk，实现单独加载。在webpack4 中`CommonsChunkPlugin`被废弃，使用`SplitChunksPlugin`



## Webpack 中常用的 loader 和 plugin



### loader

1. file-loader：把文件输出到一个文件夹，在代码中通过对应的 URL 去引用输出的文件
2. url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
3. image-loader：加载并压缩图片文件
4. babel-loader：转换 ES6+ 等 JS 新特性语法
5. css-loader：加载解析 CSS
6. style-loader：把 CSS 代码注入到 JavaScript 中，形成静态资源内联，通过 DOM 操作去加载 CSS
7. eslint-loader：通过 Eslint 检查代码
8. postcss-loader：补全前缀，兼容性，css 界的 babel
9. stylus-loader：stylus 文件编译成 css 文件
10. source-map-loader：加载额外的 Source Map，以方便断点调试

### plugin

1. html-webpack-plugin：当使用 webpack 打包时，创建一个 html 文件，并把 Webpack 打包后的静态文件自动插入到这个 html 文件中
2. define-plugin：定义环境变量
3. mini-css-extract-plugin：抽离 CSS 单独形成一个文件，支持按需加载
4. optimize-css-assets-webpack-plugin：对 CSS 代码进行压缩，不仅压缩了代码、删掉了代码中无用的注释、还去除了冗余的 css、优化了 css 的书写顺序
5. uglifyjs-webpack-plugin：压缩 JS 文件
6. webpack-bundle-analyzer：可视化 Webpack 输出文件的体积
7. split-chunks-plugin：公共模块抽取

### Webpack 中 loader 和 plugin 的不同

- loader
  Webpack 把所有文件视为模块，但是 Webpack 原生只能解析 JS 文件，如果想要把其他文件打包的话，就需要使用 loader，**loader 使得 Webpack 拥有了加载和解析非 JS 文件的能力**

  loader 在 module.rules 中配置，作为模块解析的规则存在

- plugin
  plugin 插件可以扩展 Webpack 的能力，让 Webpack 具有更多的灵活性，plugin 可以监听 Webpack 运行的生命周期中广播出的事件，可以在合适的时机通过 Webpack 提供的 API 改变输出结果

  通常是用于打包输出的 JS 文件的优化，资源的管理，和环境变量的注入，作用于整个构建过程

  plugin 在 plugins 中单独配置，类型是数组，每一项是一个 plugin 的实例，参数都通过构造函数传入

## 使用 Webpack 优化前端性能
使用 Webpack 来优化前端性能是指优化 Webpack 的输出结果，让打包的最终结果在浏览器运行更快

1. 代码压缩：删除多余的代码、注释、简化代码的写法
   uglifyjs-webpack-plugin
   optimize-css-assets-webpack-plugin
2. 利用 CDN 加速，在构建过程中将引用的静态资源路径修改为 CDN 路径.
3. treeShaking：在模块引用的时候把没有用到的代码块干掉
   原理：ES6 模块化的静态解析能力，在解析阶段就可以输出模块的依赖关系
4. Code Splitting：将代码按路由维度或者组件分块(chunk),这样做到按需加载，同时可以充分利用浏览器缓存
5. 提取公共第三方库：SplitChunksPlugin 插件来进行公共模块抽取，利用浏览器缓存可以长期缓存这些无需频繁变动的公共代码
6. .Scope Hoisting：让 Webpack 打包出来的文件更小，运行更快
   又称作用域提升，打包完之后存在大量的闭包，作用域很多，内存开销大
   原理：按照引入顺序放在一个函数作用域里，适当的重命名防止冲突
   由于 Scope Hoisting 需要分析出模块之间的依赖关系，因此源码必须采用 ES6 模块化语句
7. 分离两套配置：一般来说在项目开发中，区分开发和生产环境两套配置，各司其职
8. (开发优化)source-map：webpack 打包的时候改变了源码，在调试的时候非常的不方便，因为保存的行列已经对不上了，      source-map 就解决这个问题
   source-map 会生成一个映射文件，打包后的代码和源码(书写时的代码)的一个映射文件
   出现错误的时候便于快速定位错误位置，方便调试