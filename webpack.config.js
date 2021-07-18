module.exports = {
  entry: '../ColesRoom-Grupo2-Frontend/src/index.js',
  output: {
    path: __dirname + '../../ColesRoom-Grupo2-Frontend/public/js',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        use: 'babel-loader',
        test: /.js$/,
        exclude: /node_modules/
      },
      {
        test: /.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ]
  },
};