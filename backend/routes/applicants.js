const {Applicant} = require('../model/applicant');
const express = require('express');
const router = express.Router();



router.get(`/`, async (req, res) =>{
    const applicantList = await Applicant.find();
    res.send(applicantList);
})

router.post(`/`,  (req,res)=>{
    const applicant = new Applicant({
       applicantId: req.body.applicantId,
       applicantName: req.body.applicantName, 
       applicantCitizenshipNumber: req.body.applicantCitizenshipNumber,
       applicantAddress: req.body.applicantAddress,
       applicantDOB: req.body.applicantDOB,
       applicantGender: req.body.applicantGender,
       applicantPhoto: req.body.applicantPhoto,
       transportationOffice: req.body.transportationOffice,
       licenseType: req.body.licenseType
    });

    applicant.save().then((createdApplicant => {
        res.status(201).json(createdApplicant)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })

})

module.exports =router;