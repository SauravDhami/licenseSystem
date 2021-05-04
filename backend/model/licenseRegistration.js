const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const licenseRegistrationSchema = mongoose.Schema({
    registrationId: Number,
    registrationApplicantId: Number,
    registrationNumber: String,
    registrationName: String


})
exports.licenseRegistration = mongoose.model('LicenseRegistration',licenseRegistrationSchema)