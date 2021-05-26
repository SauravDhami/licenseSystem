const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const applicantSchema = mongoose.Schema({
   applicantId : {
      type: Number,
      required: true 
   },

   applicantName : {
     type: String,
     required: true,
    
   },

   citizenshipNumber: {
      type: String,
      required: true
    },

   applicantAddress: {
      type: String,
      required: true
    },

   applicantDOB: {
      type: Date,
      required: true
    },

   applicantGender: {
      type: String,
      required: true
    },

   applicantPhoto: {
      type: String,
      required: true
    },

   transportationOffice: {
      type: String,
      required: true
    },

   licenseType: {
      type: String,
      required: true
    }
}, {timestamps: true});
exports.Applicant = mongoose.model('Applicant', applicantSchema)