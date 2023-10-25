const path = require('path')
// entry and output files for the project & define loaders (tells webpack what to do with entry file/s)
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            { test: /.jsx?$/, loader: 'babel-loader', exclude: /node_modules/
            }
        ]
    }
}