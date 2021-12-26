const HtmlWebpakPlugin = require("html-webpack-plugin"); 

module.exports = (env)=>{
    return {
      entry: {
        "bundle": ["./src/app.ts"]
      },
      output: {
        filename: "[name].js",
        path: __dirname + "/dist"
      },
      devtool: "source-map",
    
      resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
          // 'express-handlebars':'handlebars/dist/handlebars.js',
          crypto: false,
          stream: false,
          assert: false,
          http: false,
          https: false
        },
        fallback:{
          "url":false,
          "querystring": require.resolve("querystring-es3"),
          "zlib": require.resolve("browserify-zlib"),
          "constants": require.resolve("constants-browserify"),
          fs:false,
          net:false,
        }
      },
      
      module: {
        rules: [
          { test: /\.tsx?$/, loader: "ts-loader" },
          { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]   
      }
    };
};