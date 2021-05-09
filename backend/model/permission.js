const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const permissionSchema = mongoose.Schema({
    permissionId: String,
    permissionRoleId: String,
    permissionTitle: String

})
exports.Permission = mongoose.model('Permission',permissionSchema)