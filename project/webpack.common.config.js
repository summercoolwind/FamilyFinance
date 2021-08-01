const HtmlWebpakPlugin = require("html-webpack-plugin"); 

module.exports = (env)=>{
    return {
      devServer: {
        contentBase: './dist',
        host: 'localhost',
        port: 4000,
        inline:true,  //缺少该配置，会出现上面的错误
        historyApiFallback:true  //缺少该配置，会出现上面的错误
      },
      entry: {
        "bundle": ["./src/client/index.tsx"]
      },
      output: {
        filename: "[name].js",
        path: __dirname + "/dist/client"
      },
      devtool: "source-map",
    
      resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
      },
    
      module: {
        rules: [
          { test: /\.tsx?$/, loader: "ts-loader" },
          { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
          // { test: /\.ts$/, use: "babel-loader"}
        ]   
      },
    
      plugins: [
        new HtmlWebpakPlugin({
          template:"./src/client/index.html",
          filename: './index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
          showErrors: true,
          inject: 'body',
          chunks: ["bundle"]
        })
      ],
      target: "electron-renderer"
    };
};