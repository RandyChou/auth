import returnObject from '../lib/common/returnObject';
import PermissionGroup from '../business/PermissionGroup';

var router = require('koa-router')();

router.get('/', async function(ctx, next) {
    let permissionGroup = new PermissionGroup();

    let queryData = ctx.query.queryData && JSON.parse(ctx.query.queryData);
    let permissionQueryData = ctx.query.permissionQueryData && JSON.parse(ctx.query.permissionQueryData);
    returnObject(ctx, await permissionGroup.getPermissionGroups(queryData, permissionQueryData));
});

router.post('/', async function(ctx, next) {
    let permissionGroup = new PermissionGroup();

    returnObject(ctx, await permissionGroup.addPermissionGroup(ctx.request.body.data, ctx.request.body.permissions));
});

router.put('/', async function(ctx, next) {
    let permissionGroup = new PermissionGroup();

    returnObject(ctx, await permissionGroup.upadtePermissionGroup(ctx.query.id, ctx.request.body));
});

router.delete('/', async function(ctx, next) {
    let permissionGroup = new PermissionGroup();

    returnObject(ctx, await permissionGroup.deletePermissionGroup(ctx.query.id));
});

module.exports = router;