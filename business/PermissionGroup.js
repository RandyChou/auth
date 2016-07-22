import _ from 'underscore';
import utils from '../lib/common/utils';
import PermissionGroupModel from '../models/PermissionGroup';
import PermissionModel from '../models/Permission';
import PermissionBusiness from './Permission';
import RoleBusiness from './Role';
import returnNext from '../lib/common/returnNext';

export default class PermissionGroup {
    async getPermissionGroups(queryData, permissionQueryData) {
        return returnNext(null, 200, await PermissionGroupModel.find(queryData).populate({
          path: 'permissions',
          match: permissionQueryData
        }).exec());
    }

    async addPermissionGroup(data, permissions) {
        let permissionGroupModel;

        if(_.isObject(data)) {
            permissionGroupModel = new PermissionGroupModel(data);
        } else {
            permissionGroupModel = await PermissionGroupModel.findById(data).exec();
        }

        if(permissions && permissions.length > 0) {
            _.each(permissions, function(p) {
                permissionGroupModel.permissions.push(p);
            });
        }

        permissionGroupModel.permissions = utils.uniq(permissionGroupModel.permissions);
        let pgm = await permissionGroupModel.save();
        if(permissions && permissions.length > 0) {
            let permissionBusiness = new PermissionBusiness();
            await permissionBusiness.addPermissionGroup(pgm._id, permissions);
        }

        return returnNext(null, 200, pgm);
    }

    async upadtePermissionGroup(id, updateData) {
        let permissionGroupModel = await PermissionGroupModel.findById(id).exec();
        _.extend(permissionGroupModel, updateData);
        return returnNext(null, 200, await permissionGroupModel.save());
    }

    async deletePermissionGroup(id) {
        let permissionGroupModel = await PermissionGroupModel.findById(id).exec();

        if(permissionGroupModel.permissions && permissionGroupModel.permissions.length > 0) {
            let permissionBusiness = new PermissionBusiness();
            await permissionBusiness.deletePermissionGroup(permissionGroupModel);
        }

        if(permissionGroupModel.roles && permissionGroupModel.roles.length > 0) {
            let roleBusiness = new RoleBusiness();
            await roleBusiness.deletePermissionGroup(permissionGroupModel);
        }

        return returnNext(null, 200, await PermissionGroupModel.remove({_id: id}));
    }

    async deletePermission(permissionModel) {
        _.each(permissionModel.permissionGroups, async (permissionGroupId) => {
            let pgm = await PermissionGroupModel.findById(permissionGroupId).exec();
            if(pgm.permissions.indexOf(permissionModel._id) > -1) {
                pgm.permissions.splice(pgm.permissions.indexOf(permissionModel._id), 1);
                await pgm.save();
            }
        });

        return true;
    }

    async addRole(roleId, permissionGroups) {
        _.each(permissionGroups, async (pg) => {
            let pgm = await PermissionGroupModel.findById(pg._id).exec();
            pgm.roles.push(roleId);
            pgm.roles = utils.uniq(pgm.roles);
            await pgm.save();
        });

        return true;
    }

    async deleteRole(roleModel) {
        _.each(roleModel.permissionGroups, async (permissionGroupId) => {
            let pgm = await PermissionGroupModel.findById(permissionGroupId).exec();
            if(pgm.roles.indexOf(roleModel._id) > -1) {
                pgm.roles.splice(pgm.roles.indexOf(roleModel._id), 1);
                await pgm.save();
            }
        });

        return true;
    }
}