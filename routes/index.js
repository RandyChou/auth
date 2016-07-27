import fs from 'fs';
import path from 'path';
import _ from 'underscore';

var router = require('koa-router')();

fs.readdir('./routes', (err, files) => {
    if(err) {
        return console.log('读取路由出错');
    }

    _.each(files, (file) => {
        let f = file.substring(0, file.indexOf('.'));
        if(f !== 'index') {
            let item = require(path.resolve(__dirname, file));
            router.use('/' + f, item.routes(), item.allowedMethods());
        }
    });
});

module.exports = router;
