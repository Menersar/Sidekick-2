const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipWebpackPlugin = require('zip-webpack-plugin');

const process = require('process');

const extensionsFolderName = 'extensions';

let extensionLocation = '';
let extensionInfo = '';
let extensionName = '';

module.exports = (env) => {
    // Using Webpack Environment Variables (https://webpack.js.org/guides/environment-variables/):
    // To create webpack configs for building specific extensions
    // Use env.<YOUR VARIABLE> here:
    // console.log('Extension: ', env.extensionName);

    if (env.extensionName) {
        extensionName = env.extensionName;
        extensionLocation = extensionsFolderName + '/' + extensionName + '/';
    }
    extensionInfo = require('./' + extensionLocation + 'info.json');

    return {
        bail: true,
        mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
        entry: './' + extensionLocation + 'index.js',
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, extensionLocation + 'build'),
            module: true,
            library: {
                type: 'commonjs2'
            }
        },
        experiments: {
            outputModule: true
        },
        externals: {
            'scratch-extension': 'SidekickExtension'
        },
        externalsType: 'global',
        plugins: [
            new CopyWebpackPlugin({
                patterns: [{
                    from: path.join(__dirname, extensionLocation + 'locales'),
                    to: path.join(__dirname, extensionLocation + 'build/locales')
                }, {
                    from: path.join(__dirname, extensionLocation + 'assets'),
                    to: path.join(__dirname, extensionLocation + 'build/assets')
                }, {
                    from: path.join(__dirname, extensionLocation + 'info.json'),
                    to: path.join(__dirname, extensionLocation + 'build/info.json')
                }]
            }),
            new ZipWebpackPlugin({
                path: path.join(__dirname, extensionLocation + 'dist'),
                filename: `${extensionInfo.id}@${extensionInfo.version}`,
                extension: 'skx'
            })
        ]
    };
};