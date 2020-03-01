const path = require('path');
module.exports = {
    output: {
        filename: 'assets/js/[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    }
};