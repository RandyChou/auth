import mongoose from '../lib/service/mongoose';

let Schema = mongoose.Schema;
let UserSchema = new Schema({
    userName: String,
    passWord: String,
    apiKey: String,
    userType: {type: Schema.Types.ObjectId, ref: 'UserType'},
    roles: [{type: Schema.Types.ObjectId, ref: 'Role'}],
    enabled: {type: Boolean, default: true},
    addUser: {type: Schema.Types.ObjectId, ref: 'User'},
    updateUser: {type: Schema.Types.ObjectId, ref: 'User'},
    deleteFlag: {type: Boolean, default: false}
}, {
    timestamps: true
});

export default mongoose.model('User', UserSchema);