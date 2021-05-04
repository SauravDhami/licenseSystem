const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const applicantSchema = mongoose.Schema({
   applicantId : Number,
   applicantName : String,
   applicantCitizenshipNumber: String,
   applicantAddress: String,
   applicantDOB: Date,
   applicantGender: String,
   applicantPhoto: String,
   transportationOffice: String,
   licenseType: String
})
exports.Applicant = mongoose.model('Applicant', applicantSchema)