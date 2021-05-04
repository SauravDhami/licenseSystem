const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const permissionSchema = mongoose.Schema({
    permissionId: Number,
    permissionRoleId: Number,
    permissionTitle: String

})
exports.permission = mongoose.model('Permission',permissionSchema)