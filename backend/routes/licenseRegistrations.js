const {LicenseRegistration} = require('../model/licenseRegistration');
const express = require('express');
const router = express.Router();



//* get request response
//?for all licenseRegistration
router.get(`/`, async (req, res) =>{
    const licenseRegistrationList = await LicenseRegistration.find();
    res.send(licenseRegistrationList);
})

//?for specific licenseRegistration
router.get(`/:id`, async (req, res) => {
    const licenseRegistration = await LicenseRegistration.findById(req.params.id);

    if(!licenseRegistration) {
        res.status(500).json({message: 'The licenseRegistration is not found!'});
    }

    res.status(200).send(licenseRegistration);
})


//* post request response
router.post(`/`, async (req, res) =>{
    let licenseRegistration = new LicenseRegistration(
        {
            registrationId: req.body.registrationId,
            registrationName: req.body.registrationName, 
            registrationNumber: req.body.registrationNumber,
            registrationApplicantId: req.body.registrationApplicantId
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
    const licenseRegistration = await LicenseRegistration.findByIdAndUpdate(
        req.params.id,
        {
            registrationId: req.body.registrationId,
            registrationName: req.body.registrationName, 
            registrationNumber: req.body.registrationNumber,
            registrationApplicantId: req.body.registrationApplicantId
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