import mongoose from '../lib/service/mongoose';

let Schema = mongoose.Schema;
let UserTypeSchema = new Schema({
    name: String,
    addUser: {type: Schema.Types.ObjectId, ref: 'User'},
    updateUser: {type: Schema.Types.ObjectId, ref: 'User'},
    deleteFlag: {type: Boolean, default: false}
}, {
    timestamps: true
});

export default mongoose.model('UserType', UserTypeSchema);