var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');


var SRC_PATH = path.resolve(__dirname, 'src');


var DEV_SERVER = {
    IP: '127.0.0.1',
    PORT: 8888
};


const LOADERS = {
    ESLINT: 'eslint',
    REACT_HOT: 'react-hot',
    BABEL: 'babel',
    FLOWCHECK: 'flowcheck',

    STYLE: 'style',
    CSS: 'css?localIdentName=[path][name]---[local]---[hash:base64:5]',
    SASS: `sass?sourceMap&includePaths[]=${SRC_PATH}`,
    POST_CSS: 'postcss',
};


module.exports = {
    //debug: true,
    //devtool: 'eval',
    ip: DEV_SERVER.IP,
    port: DEV_SERVER.PORT,

    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: SRC_PATH
    },
    entry: {
        app: [
            './src/main.js',
            `webpack-dev-server/client?http://${DEV_SERVER.IP}:${DEV_SERVER.PORT}`,
            'webpack/hot/only-dev-server',
        ],
        vendor: [
            'react',
            'alt',
            'promise',
            'react-treebeard'
        ]
    },
    output: {
        path: __dirname,
        filename: '[name].js',
        publicPath: '/',
    },

    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            title: path.basename(__dirname)
        }),
    ],

    module: {

        preLoaders: [{
            test: /\.jsx?$/,
            include: SRC_PATH,
            loaders: [LOADERS.ESLINT],
        }],

        loaders: [{
            test: /\.jsx?$/,
            include: SRC_PATH,
            loaders: [
                LOADERS.REACT_HOT,
                LOADERS.FLOWCHECK,
                `${LOADERS.BABEL}?blacklist=flow`
            ],
        }, {
            test: /\.css$/,
            include: SRC_PATH,
            loaders: [
                LOADERS.STYLE,
                LOADERS.CSS,
                LOADERS.POST_CSS
            ],
        }, {
            test: /\.scss$/,
            include: SRC_PATH,
            loaders: [
                LOADERS.STYLE,
                LOADERS.CSS,
                LOADERS.SASS,
                LOADERS.POST_CSS
            ],
        }]
    },

};
