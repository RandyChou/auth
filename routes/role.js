import returnObject from '../lib/common/returnObject';
import Role from '../business/Role';

var router = require('koa-router')();

router.get('/', async function(ctx, next) {
    let role = new Role();

    let queryData = ctx.query.queryData && JSON.parse(ctx.query.queryData);
    returnObject(ctx, await role.getRoles(queryData));
});

router.post('/', async function(ctx, next) {
    let role = new Role();

    returnObject(ctx, await role.addRole(ctx.request.body.data, ctx.request.body.permissionGroups));
});

router.put('/', async function(ctx, next) {
    let role = new Role();

    returnObject(ctx, await role.upadteRole(ctx.query.id, ctx.request.body));
});

router.delete('/', async function(ctx, next) {
    let role = new Role();

    returnObject(ctx, await role.deleteRole(ctx.query.id));
});

module.exports = router;