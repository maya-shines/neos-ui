const merge = require('webpack-merge');
const path = require('path');
const sharedWebpackConfig = require('./packages/build-essentials/src/webpack.config.js');
delete sharedWebpackConfig.__internalDependencies;

module.exports = merge(
    sharedWebpackConfig,
    {
        entry: {
            Host: './packages/neos-ui/src/index.js',
            HostOnlyStyles: './packages/neos-ui/src/styleHostOnly.css',
            Guest: './packages/neos-ui-ckeditor-bindings/src/index.js',
            Vendor: [
                'react',
                'react-redux',
                'plow-js',
                'immutable'
            ]
        },

        resolve: {
            modules: [
                path.resolve(__dirname, './packages/neos-ui/node_modules'),
                path.resolve(__dirname, './node_modules')
            ]
        }
    }
);
