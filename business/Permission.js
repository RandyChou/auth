import _ from 'underscore';
import utils from '../lib/common/utils';
import PermissionModel from '../models/Permission';
import PermissionGroupBusiness from './PermissionGroup';
import returnNext from '../lib/common/returnNext';

export default class Permission {
    async getPermissions(data) {
        return returnNext(null, 200, await PermissionModel.find(data).exec());
    }

    async addPermission(data) {
        let permissionModel = new PermissionModel(data);
        return returnNext(null, 200, await permissionModel.save());
    }

    async updatePermission(id, data) {
        let permission = await PermissionModel.findById(id).exec();
        _.extend(permission, data);
        return returnNext(null, 200, await permission.save());
    }

    async deletePermission(id) {
        let permissionModel = await PermissionModel.findById(id).exec();

        if(permissionModel.permissionGroups && permissionModel.permissionGroups.length > 0) {
            let permissionGroupBusiness = new PermissionGroupBusiness();
            await permissionGroupBusiness.deletePermission(permissionModel);
        }

        return returnNext(null, 200, await PermissionModel.remove({_id: id}));
    }

    async addPermissionGroup(permissionGroupId, permissions) {
        _.each(permissions, async (p) => {
            let pm = await PermissionModel.findById(p._id).exec();
            pm.permissionGroups.push(permissionGroupId);
            pm.permissionGroups = utils.uniq(pm.permissionGroups);
            await pm.save();
        });

        return true;
    }

    async deletePermissionGroup(permissionGroupModel) {
        _.each(permissionGroupModel.permissions, async (permissionId) => {
            let permission = await PermissionModel.findById(permissionId).exec();

            if(permission.permissionGroups.indexOf(permissionGroupModel._id) > -1) {
                permission.permissionGroups.splice(permission.permissionGroups.indexOf(permissionGroupModel._id), 1);
                await permission.save();
            }
        });

        return true;
    }
}