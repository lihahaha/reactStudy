const json = require('../../package.json');//引进package.json
const newEntry = {
    'index': './entryBuild/index.js',
    'shop': './entryBuild/shop.js',
};

newEntry.vendor = Object.keys(json.dependencies); //把 package.json dependencies字段的值放进 vendor中
let config = {
    entry: {
        'index':'./entryBuild/index.js'
    },
    resolve:{
        extensions:['.js','.json','.jsx','.css','.pcss','.less','.scss']
    }
};
module.exports = config;