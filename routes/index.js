import permission from './permission';
import permissionGroup from './permissionGroup';
import role from './role';
import user from './user';

var router = require('koa-router')();

router.use('/user', user.routes(), user.allowedMethods());
router.use('/role', role.routes(), role.allowedMethods());
router.use('/permissionGroup', permissionGroup.routes(), permissionGroup.allowedMethods());
router.use('/permission', permission.routes(), permission.allowedMethods());

module.exports = router;
