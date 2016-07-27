import _ from 'underscore';
import UserTypeModel from '../models/UserType';
import returnNext from '../lib/common/returnNext';

export default class UserType {
    async getUserTypes(data) {
        return returnNext(null, 200, await UserTypeModel.find(data).exec());
    }

    async addUserType(data) {
        let userTypeModel = new UserTypeModel(data);
        return returnNext(null, 200, await userTypeModel.save());
    }

    async updateUserType(id, data) {
        let userTypeModel = await UserTypeModel.findById(id).exec();
        _.extend(userTypeModel, data);
        return returnNext(null, 200, await userTypeModel.save());
    }

    async deleteUserType(id) {
        return returnNext(null, 200, await UserTypeModel.remove({_id: id}));
    }
}