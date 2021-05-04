const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({

    userId: Number, 
    userRole: String,
    userName: String,
    userEmail: String,
    userDOB: Date,
    userAddress: String,
    userPassword: String 
  

})
exports.user = mongoose.model('User',userSchema)