import _ from 'underscore';
import utils from '../lib/common/utils';
import RoleModel from '../models/Role';
import PermissionGroupBusiness from './PermissionGroup';
import UserBusiness from './User';
import returnNext from '../lib/common/returnNext';

export default class Role {
    async getRoles(queryData) {
        return returnNext(null, 200, await RoleModel.find(queryData).populate({
            path: 'permissionGroups',
            populate: {
                path: 'permissions'
            }
        }).exec());
    }

    async addRole(data, permissionGroups) {
        let roleModel;
        if(_.isObject(data)) {
            roleModel = new RoleModel(data);
        } else {
            roleModel = await RoleModel.findById(data).exec();
        }

        if(permissionGroups && permissionGroups.length > 0) {
            _.each(permissionGroups, function(pg) {
                roleModel.permissionGroups.push(pg);
            });
            roleModel.permissionGroups = utils.uniq(roleModel.permissionGroups);
        }

        let rm = await roleModel.save();

        if(permissionGroups && permissionGroups.length > 0) {
            let permissionGroupBusiness = new PermissionGroupBusiness();
            await permissionGroupBusiness.addRole(rm._id, permissionGroups);
        }

        return returnNext(null, 200, rm);
    }

    async updateRole(id, updateData) {
        let roleModel = await RoleModel.findById(id).exec();
        _.extend(roleModel, updateData);
        return returnNext(null, 200, roleModel.save());
    }

    async deleteRole(id) {
        let role = await RoleModel.findById(id).exec();

        if(role.permissionGroups && role.permissionGroups.length > 0) {
            let permissionGroupBusiness = new PermissionGroupBusiness();
            await permissionGroupBusiness.deleteRole(role);
        }

        if(user.roles && user.roles.length > 0) {
            let userBusiness = new Business();
            await userBusiness.deleteRole(role);
        }

        return returnNext(null, 200, await RoleModel.remove({_id: id}));
    }

    async deletePermissionGroup(permissionGroupModel) {
        _.each(permissionGroupModel.roles, async (roleId) => {
            let roleModel = await RoleModel.findById(roleId).exec();
            if(roleModel.permissionGroups.indexOf(permissionGroupModel._id) > -1) {
                roleModel.permissionGroups.splice(roleModel.permissionGroups.indexOf(permissionGroupModel._id), 1);
                await roleModel.save();
            }
        });

        return true;
    }

    async deleteUser(userModel) {
        _.each(userModel.roles, async (roleId) => {
            let roleModel = await RoleModel.findById(roleId).exec();
            if(roleModel.users.indexOf(userModel._id)) {
                roleModel.users.splice(roleModel.users.indexOf(userModel._id), 1);
                await roleModel.save();
            }
        });
    }
}