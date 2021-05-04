const {LicenseRegistration} = require('../model/licenseRegistration');
const express = require('express');
const router = express.Router();


router.get(`/`, async (req, res) =>{
    const licenseRegistrationList = await LicenseRegistration.find();
    res.send(licenseRegistrationList);
})

router.post(`/`,  (req,res)=>{
    const licenseRegistration = new LicenseRegistration({
        registrationId: req.body.registrationId,
        registrationApplicantId: req.body.registrationApplicantId,
        registrationNumber: req.body.registrationNumber,
        registrationName: req.body.registrationName

    });

    licenseRegistration.save().then((createdLicenseRegistration => {
        res.status(201).json(createdLicenseRegistration)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })

})

module.exports =router;