
module.exports = {
    devtool: 'eval-source-map',
    entry: './src/main.js',
    output: {
        path: __dirname + '/public/build/',
        publicPath: 'build/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react']
                }
            },
            {
                test: /\.css$/,
                use: [
                "style-loader",
                "css-loader"
                ]
            },
            {
                test: /\.jsx$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['env', 'react']
                    }
                },
                exclude: [/node_modules/]
            },
            {
                test: /\.(ttf|eot|svg|img|png|gif|jpg)(\?[a-z0-9#=&.]+)?$/,
                loader: 'file-loader?name=[path][name].[ext]'
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "babel-loader"
                    },
                    {
                        loader: "react-svg-loader",
                        options: {
                            jsx: true 
                        }
                    }
                ]
            }
        ]
    }
};
