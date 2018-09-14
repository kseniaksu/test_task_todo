global.Promise         = require('bluebird');

var webpack            = require('webpack');
var path               = require('path');
var ExtractTextPlugin  = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var publicPath         = 'http://localhost:8080/public/assets';
var cssName            = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';
var jsName             = process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js';

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER:  JSON.stringify(true),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
  new ExtractTextPlugin(cssName)
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new CleanWebpackPlugin([ 'public/assets/' ], {
      root: __dirname,
      verbose: true,
      dry: false
    })
  );
}

module.exports = {
  entry: ['babel-polyfill', './src/client.js'],
  watch: process.env.NODE_ENV !== 'production',
  resolve: {
      modules: [
      path.join(__dirname, "src"),
     "node_modules"
   ],
   extensions: ['.js', '.jsx', '.json', '*']
  },
  plugins,
  output: {
    path: `${__dirname}/public/assets/`,
    filename: jsName,
    publicPath
  },
  module: {
    loaders : [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'less-loader' })
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: { presets: ['babel-preset-es2015', 'babel-preset-react', 'babel-preset-stage-2'] }
      },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ['file-loader?context=src/images&name=images/[path][name].[ext]', {
                    loader: 'image-webpack-loader',
                    query: {
                        mozjpeg: {
                            progressive: true,
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        optipng: {
                            optimizationLevel: 4,
                        },
                        pngquant: {
                            quality: '75-90',
                            speed: 3,
                        },
                    },
                }],
                exclude: /node_modules/,
                include: __dirname,
            }
        ]
  },
  devtool: 'eval-source-map',
  devtool: process.env.NODE_ENV !== 'production' ? 'eval-source-map' : null,
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
};