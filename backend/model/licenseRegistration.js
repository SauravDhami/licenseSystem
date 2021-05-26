const mongoose =  require('mongoose');

const licenseRegistrationSchema = mongoose.Schema({
    registrationId:{
        type: String,
        required: true
      },

      applicantName : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Applicant',
        required: true
      },

      userName : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      
    registrationApplicantId: {
        type: String,
        required: true
      },

    registrationDate: {
        type: Date,
        default: Date.now,
        required: true
      },

    examinationDate: {
        type: Date,
        required: true
      },

    transportationOffice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Applicant',
      required: true
      }
}, {timestamps: true});
exports.LicenseRegistration = mongoose.model('LicenseRegistration',licenseRegistrationSchema)