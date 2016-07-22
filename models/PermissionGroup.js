import mongoose from '../lib/service/mongoose';

let Schema = mongoose.Schema;
let PermissionGroupSchema = new Schema({
    name: String,
    enabled: {type: Boolean, default: true},
    roles: [{type: Schema.Types.ObjectId, ref: 'Role'}],
    permissions: [{type: Schema.Types.ObjectId, ref: 'Permission'}],
    addUser: {type: Schema.Types.ObjectId, ref: 'User'},
    updateUser: {type: Schema.Types.ObjectId, ref: 'User'},
    deleteFlag: {type: Boolean, default: false}
}, {
    timestamps: true
});

export default mongoose.model('PermissionGroup', PermissionGroupSchema);