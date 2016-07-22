import returnObject from '../lib/common/returnObject';
import User from '../business/User';

var router = require('koa-router')();

router.get('/', async function(ctx, next) {
    let user = new User();

    let queryData = ctx.query.queryData && JSON.parse(ctx.query.queryData);
    returnObject(ctx, await user.getUsers(queryData));
});

router.post('/', async function(ctx, next) {
    let user = new User();

    returnObject(ctx, await user.addUser(ctx.request.body.data, ctx.request.body.roles));
});

router.put('/', async function(ctx, next) {
    let user = new User();

    returnObject(ctx, await user.upadteUser(ctx.query.id, ctx.request.body));
});

router.delete('/', async function(ctx, next) {
    let user = new User();

    returnObject(ctx, await user.deleteUser(ctx.query.id));
});

module.exports = router;