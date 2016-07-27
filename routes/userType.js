import returnObject from '../lib/common/returnObject';
import UserType from '../business/UserType';

var router = require('koa-router')();

router.get('/', async function(ctx, next) {
    let userType = new UserType();

    let data = ctx.query.data && JSON.parse(ctx.query.data);
    returnObject(ctx, await userType.getUserTypes(data));
});

router.post('/', async function(ctx, next) {
    let userType = new UserType();

    returnObject(ctx, await userType.addUserType(ctx.request.body));
});

router.put('/', async function(ctx, next) {
    let userType = new UserType();

    returnObject(ctx, await userType.updateUserType(ctx.query.id, ctx.request.body));
});

module.exports = router;
