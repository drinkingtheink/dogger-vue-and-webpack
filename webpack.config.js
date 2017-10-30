const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const in_production = (process.env.NODE_ENV === 'production');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Clean Up Stuff

// the path(s) that should be cleaned
let pathsToClean = [
    'dist'
];

// the clean options to use
let cleanOptions = {
    root:     __dirname,
    verbose:  true,
    dry:      false
};

module.exports = {
	entry: {
		main: './src/main.js',
		vendor: ['jquery']
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js'
	},
	module: {
		rules: [
			// SASS
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },
			// JS
            {
            	test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
            },
            // VUE COMPONENTS
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
			// IMAGES
			{
                test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: 'img/[name].[hash].[ext]'
				}
			}
		]
	},

	plugins: [
		new ExtractTextPlugin('[name].css'),

        new CleanWebpackPlugin(pathsToClean, cleanOptions),

		new webpack.LoaderOptionsPlugin({
			minimize: in_production
		})
	],

    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    }
};

if(in_production) {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin()
	);
}