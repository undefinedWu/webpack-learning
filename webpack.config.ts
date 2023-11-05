import path from "path"
import Webpack from "webpack"
import process from "process"
import TerserPlugin from "terser-webpack-plugin"

const mode: Webpack.Configuration["mode"] = process.env.NODE_ENV === "development" ? "development" : "production";

const config: Webpack.Configuration = {
  mode,
  entry: {
    main: "./src/index.ts"
  },
  // 设置打包后的文件信息
  output: {
    clean: true,
    path: path.resolve(__dirname, "./output")
  },
  // devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    // 配置别名
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
    // 方便引入文件的时候可以不用携带文件后缀
    extensions: [
      ".ts",
      ".js",
      ".json"
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // 是否需要将注释提取到一个单独文件中
        extractComments: false,
        terserOptions: {
          format: {
            comments: false
          }
        }
      })
    ]
  }
}

export default config