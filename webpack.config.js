const webpack = require('webpack');
const dotenv = require('dotenv') 
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    // 환경변수 설정
    const { DEV } = env;
    if(DEV) {
        dotenv.config({path: './dev.env'})
    } else {
        dotenv.config({path: './.env'})
    }

    return {
        mode: process.env.MODE,         // development/production
        entry: './src/index.js',        // start point 

        // Set output path bundled file
        output: {
            path: path.resolve(__dirname, 'dist') + '/dist',
            filename: 'bundle.[hash].js',
            publicPath: '/',
        },

        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'style-babel'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                camelCase: true,
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'public/index.html'
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                DEVELOPMENT: DEV ? "true" : "false",
                API_SERVER_HOST: DEV ? JSON.stringify(process.env.API_SERVER) : "",
            }),
           
        ],
        devServer: {
            // static directiry 설정 
            static: {
                directory: path.join(__dirname, 'public'),
            },
            // proxy 설정
            proxy: {
                '/api': {
                    target: 'http://127.0.0.1:8080',
                    pathRewrite: { '^/api': '' },
                    secure: false,
                    changeOrigin: true,
                    onProxyRes: function(proxyRes, req, res) {
                        
                    },
                    onError: function(err, req, res) {
                        
                    },
                
                },
            },
            // 서버 설정
            host: 'localhost',
            port: process.env.PORT,
            open: true,
            historyApiFallback: true,
            hot: true
        }
    }
}