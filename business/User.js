import _ from 'underscore';
import utils from '../lib/common/utils';
import md5 from '../lib/common/md5';
import UserModel from '../models/User';
import RoleBusiness from './Role';
import returnNext from '../lib/common/returnNext';

export default class User {
    async getUsers(queryData) {
        return returnNext(null, 200, await UserModel.find(queryData).populate({
            path: 'roles',
            populate: {
                path: 'permissionGroups',
                populate: {
                    path: 'permissions'
                }
            }
        }).populate('userType').exec());
    }

    async addUser(data, roles) {
        let userModel;
        if(_.isObject(data)) {
            data.apiKey = md5.getMd5(data.userName).substr(8, 16);
            data.passWord = data.passWord ? md5.getMd5(data.passWord) : md5.getMd5(data.userName);
            userModel = new UserModel(data);
        } else {
            userModel = await UserModel.findById(data).exec();
        }

        if(roles && roles.length > 0) {
            _.each(roles, (role) => {
                userModel.roles.push(role);
            });

            userModel.roles = utils.uniq(userModel.roles);
        }

        let um = await userModel.save();
        if(roles && roles.length > 0) {
            let roleBusiness = new RoleBusiness();
            await roleBusiness.addUser(um._id, roles);
        }

        return returnNext(null, 200, um);
    }

    async updateUser(id, updateData) {
        let userModel = await UserModel.findById(id).exec();
        _.extend(userModel, udpateData);
        return returnNext(null, 200, await userModel.save());
    }

    async deleteUser(id) {
        let userModel = await UserModel.findById(id).exec();

        if(userModel.roles && userModel.roles.length > 0) {
            let roleBusiness = new RoleBusiness();
            await roleBusiness.deleteUser(userModel);
        }

        return returnNext(null, 200, await UserModel.remove({_id: id}));
    }

    async deleteRole(roleModel) {
        _.each(roleModel.users, async (userId) => {
            let userModel = await UserModel.findById(userId).exec();

            if(userModel.roles.indexOf(roleModel._id) > -1) {
                userModel.roles.splice(userModel.roles.indexOf(roleModel._id), 1);
                await userModel.save();
            }
        });

        return true;
    }
}