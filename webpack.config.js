module.exports = {
  devtool: "source-map", //配置生成Source Maps，选择合适的选项
  entry: ["babel-polyfill", __dirname + "/app.js"],
  output: {
    path: __dirname + "/dist/", //打包后的文件存放的地方
    filename: "bundle.js" //打包后输出文件的文件名
  },
  externals: {},
  module: {
    //在配置文件里添加JSON loader
    loaders: [
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ["es2015", "react", "stage-0"]
        }
      },

      {
        test: /\.css$/,
        loader: "style!css" //添加对样式表的处理
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: "url?limit=25000"
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        loader: "url?limit=30000&name=[name]-[hash].[ext]"
      },
      {
        test: /\.less$/i,
        loader: "style!css!less"
      }
    ]
  },
  devServer: {
    port: "9011",
    host: "localHost",
    contentBase: "./dist", //本地服务器所加载的页面所在的目录
    colors: true, //终端中输出结果为彩色
    historyApiFallback: true, //不跳转
    inline: true //实时刷新
  }
};
