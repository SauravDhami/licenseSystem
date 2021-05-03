const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const applicantSchema = mongoose.Schema({
    name : String,
    image : String,
    countInStock : Number

})
exports.applicant = mongoose.model('Applicant',applicantSchema)