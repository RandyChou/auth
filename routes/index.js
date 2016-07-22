import permission from './permission';
import permissionGroup from './permissionGroup';

var router = require('koa-router')();

router.use('/permission', permission.routes(), permission.allowedMethods());
router.use('/permissionGroup', permissionGroup.routes(), permissionGroup.allowedMethods());

module.exports = router;
