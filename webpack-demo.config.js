const path = require('path');

module.exports = {
    entry: './dist/demo/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/demo'),
        filename: 'index.bundle.js'
    },
    mode: "development"
};
