import mongoose from '../lib/service/mongoose';

let Schema = mongoose.Schema;
let PermissionSchema = new Schema({
    name: String,
    route: String,
    enabled: {type: Boolean, default: true},
    permissionGroups: [{type: Schema.Types.ObjectId, ref: 'PermissionGroup'}],
    addUser: {type: Schema.Types.ObjectId, ref: 'User'},
    updateUser: {type: Schema.Types.ObjectId, ref: 'User'},
    deleteFlag: {type: Boolean, default: false}
}, {
    timestamps: true
});

export default mongoose.model('Permission', PermissionSchema);