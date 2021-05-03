const Applicant = require('../model/applicant');
const express = require('express');
const router = express.Router();


router.get(`/`,  (req,res)=>{
    const applicant = {
        id: 1,
        name: "barber",
        image: "url",
    }
    
    res.send(applicant);
})

router.post(`/`,  (req,res)=>{
    const applicant = new Applicant({
       name: req.body.name,
       image: req.body.image,
       countInStock: req.body.countInStock

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