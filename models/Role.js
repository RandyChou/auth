import mongoose from '../lib/service/mongoose';

let Schema = mongoose.Schema;
let RoleSchema = new Schema({
    name: String,
    commonFlag: {type: Boolean, default: false},
    enabled: {type: Boolean, default: true},
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    permissionGroups: [{type: Schema.Types.ObjectId, ref: 'PermissionGroup'}],
    addUser: {type: Schema.Types.ObjectId, ref: 'User'},
    updateUser: {type: Schema.Types.ObjectId, ref: 'User'},
    deleteFlag: {type: Boolean, default: false}
}, {
    timestamps: true
});

export default mongoose.model('Role', RoleSchema);