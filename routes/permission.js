import returnObject from '../lib/common/returnObject';
import Permission from '../business/Permission';

var router = require('koa-router')();

router.get('/', async function(ctx, next) {
    let permission = new Permission();

    let data = ctx.query.data && JSON.parse(ctx.query.data);
    returnObject(ctx, await permission.getPermissions(data));
});

router.post('/', async function(ctx, next) {
    let permission = new Permission();

    returnObject(ctx, await permission.addPermission(ctx.request.body));
});

router.put('/', async function(ctx, next) {
    let permission = new Permission();

    returnObject(ctx, await permission.updatePermission(ctx.query.id, ctx.request.body));
});

module.exports = router;
