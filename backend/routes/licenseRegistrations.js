const {LicenseRegistration} = require('../model/licenseRegistration');
const {Applicant} = require('../model/applicant');
const {User} = require('../model/user');
const express = require('express');
const router = express.Router();



//* get request response
//?for all licenseRegistration
router.get(`/`, async (req, res) =>{
    const licenseRegistrationList = await LicenseRegistration.find()
    .populate('userName' , 'userName')
    .populate('applicantName' , 'applicantName')
    .populate('transportationOffice', 'transportationOffice');
    res.send(licenseRegistrationList);
})

//?for specific licenseRegistration
router.get(`/:id`, async (req, res) => {
    const licenseRegistration = await LicenseRegistration.findById(req.params.id)
    .populate('userName' , 'userName')
    .populate('applicantName' , 'applicantName')
    .populate('transportationOffice', 'transportationOffice');

    if(!licenseRegistration) {
        res.status(500).json({message: 'The licenseRegistration is not found!'});
    }

    res.status(200).send(licenseRegistration);
})


//* post request response
router.post(`/`, async (req, res) =>{
    const applicantName = (await Applicant.findById(req.body.applicantName).populate('Applicant').select('applicantName'));
    const userName = ( await User.findById(req.body.userName).populate('User').select('userName') );
    const transportationOffice = (await Applicant.findById(req.body.transportationOffice).populate('Applicant').select('transportationOffice') );
    
    let licenseRegistration = new LicenseRegistration(
        {
            registrationId: req.body.registrationId,
            applicantName: applicantName,
            registrationApplicantId: req.body.registrationApplicantId,
            userName: userName,
            registrationDate: req.body.registrationDate,
            examinationDate: req.body.examinationDate,
            transportationOffice: transportationOffice
        });
    
    licenseRegistration = await licenseRegistration.save();

    if(!licenseRegistration)
        return res.status(500).json({
            error: err,
            success: false,
            message: 'The licenseRegistration cannot be created!'
        });

    res.send(licenseRegistration);
})



//* update
router.put(`/:id`, async (req, res)=>{
    const applicantName = (await Applicant.findById(req.body.applicantName).populate('Applicant').select('applicantName') )
    const userName = (await User.findById(req.body.userName).populate('User').select('userName') )
    const transportationOffice = (await Applicant.findById(req.body.transportationOffice).populate('Applicant').select('transportationOffice') )

    const licenseRegistration = await LicenseRegistration.findByIdAndUpdate(
        req.params.id,
        {
            registrationId: req.body.registrationId,
            applicantName: applicantName,
            registrationApplicantId: req.body.registrationApplicantId,
            userName: userName,
            registrationDate: req.body.registrationDate,
            examinationDate: req.body.examinationDate,
            transportationOffice: transportationOffice
        },
        {
            new: true
        }
    );

    if(!licenseRegistration)
        return res.status(404).send('The licenseRegistration cannot be created!');

    res.send(licenseRegistration); 
})


//* delete request and response
router.delete(`/:id`, (req, res) => {
    LicenseRegistration.findByIdAndRemove(req.params.id).then(LicenseRegistration => {
        if(LicenseRegistration){
            return res.status(200).json({success: true, message: 'The LicenseRegistration is deleted!'});
        }
        else{
            return res.status(404).json({success: false, message: 'The LicenseRegistration is not found!'});
        }
    }).catch(err=>{
        return res.status(400).json({success: false, error: err});
    })
})



module.exports =router;