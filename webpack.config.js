const path = require('path');

module.exports = {
  devtool:'eval-source-map',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, 'src')],
        use: 'ts-loader',
      }
    ]
  },
  output: {
    publicPath: 'public',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  resolve:{
    extensions:['.js','.ts']
  },
  mode:'none',
  devServer:{
    proxy:{
      '/socket.io':'http://localhost:8001'
    }
  },
};