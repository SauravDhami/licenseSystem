const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const licenseRegistrationSchema = mongoose.Schema({
    registrationId: Number,
    registrationApplicantId: Number,
    registrationDate: Date,
    examinationDate: Date,
    transportationOffice: String
    


})
exports.LicenseRegistration = mongoose.model('LicenseRegistration',licenseRegistrationSchema)