module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactLoadingButton',
      externals: {
        react: 'React'
      }
    }
  },
  webpack: {
    extra: {
      module: {
        rules: [
          {
            test: /\.js$/,
            enforce: 'pre',
            loader: "eslint-loader",
            exclude: [/node_modules/, /demo/],
            options: {
              emitWarning: true,
              // eslint options (if necessary)
              // configFile: require.resolve('./.eslintrc.js')
            }
          },
        ],
      },
    }
  }
};
