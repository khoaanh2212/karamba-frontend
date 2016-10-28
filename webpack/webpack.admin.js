const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function getEntries(entries) {
    if (process.env.NODE_ENV === 'development') {
        return entries.concat([
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server']
        )
    }
    return entries;
}

var environment = JSON.stringify(process.env.NODE_ENV) || JSON.stringify("development");
var publicPath = process.env.PUBLIC_PATH || "/";
var config = {
    devtool: 'eval-source-map',
    entry: getEntries(['./src/admin/app']),
    output: {
        path: "./dist",
        publicPath: publicPath,
        filename: 'admin.js'
    },
    resolve: {
        modulesDirectories: ['node_modules', './src/admin'],
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: environment,
                PUBLIC_PATH: JSON.stringify(publicPath)
            }
        }),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: './src/admin/index.ejs',
            filename: './index.html'
        }),
        function() {
            this.plugin("done", function(stats) {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf("--watch") == -1) {
                    console.log(stats.compilation.errors);
                    process.exit(1);
              }
          });
        }
    ],
    module: {
        loaders: [
            {test: /\.jsx?$/, loader: "react-hot!babel", exclude: /node_modules/},
            {test: /\.scss$/, loader: 'style!css!sass'},
             {test: /\.(jpe?g|png|gif|svg|eot|woff|ttf|svg|woff2)$/, loader: "file?name=[name].[ext]"}
        ]
    },
    devServer: {
        historyApiFallback: true
    }
};

console.log('Webpack dev build');

module.exports = config;
