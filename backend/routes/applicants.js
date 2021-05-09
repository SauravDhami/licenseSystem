const {Applicant} = require('../model/applicant');
const express = require('express');
const router = express.Router();



//* get request response
//?for all applicant
router.get(`/`, async (req, res) =>{
    const applicantList = await Applicant.find();
    res.send(applicantList);
})

//?for specific applicant
router.get(`/:id`, async (req, res) => {
    const applicant = await Applicant.findById(req.params.id);

    if(!applicant) {
        res.status(500).json({message: 'The applicant is not found!'});
    }

    res.status(200).send(applicant);
})


//* post request response
router.post(`/`, async (req, res) =>{
    let applicant = new Applicant(
        {
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
    
    applicant = await applicant.save();

    if(!applicant)
        return res.status(500).json({
            error: err,
            success: false,
            message: 'The applicant cannot be created!'
        });

    res.send(applicant);
})



//* update
router.put(`/:id`, async (req, res)=>{
    const applicant = await Applicant.findByIdAndUpdate(
        req.params.id,
        {
            applicantId: req.body.applicantId,
            applicantName: req.body.applicantName, 
            applicantCitizenshipNumber: req.body.applicantCitizenshipNumber,
            applicantAddress: req.body.applicantAddress,
            applicantDOB: req.body.applicantDOB,
            applicantGender: req.body.applicantGender,
            applicantPhoto: req.body.applicantPhoto,
            transportationOffice: req.body.transportationOffice,
            licenseType: req.body.licenseType
        },
        {
            new: true
        }
    );

    if(!applicant)
        return res.status(404).send('The applicant cannot be created!');

    res.send(applicant); 
})


//* delete request and response
router.delete(`/:id`, (req, res) => {
    Applicant.findByIdAndRemove(req.params.id).then(Applicant => {
        if(Applicant){
            return res.status(200).json({success: true, message: 'The Applicant is deleted!'});
        }
        else{
            return res.status(404).json({success: false, message: 'The Applicant is not found!'});
        }
    }).catch(err=>{
        return res.status(400).json({success: false, error: err});
    })
})



module.exports =router;