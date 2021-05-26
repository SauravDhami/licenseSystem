const {Applicant} = require('../model/applicant');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpeg',
    'image/jpg' : 'jpg'
}



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const isValid = FILE_TYPE_MAP[file.mimetype];
      let uploadError = new Error('invalid image type');
        
      if(isValid){
          uploadError =  null
      }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
       
        const fileName = file.originalname.split(' ').join('-') ;
        const extension = FILE_TYPE_MAP[ file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
   
const uploadOptions = multer({ storage: storage })



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
router.post(`/`, uploadOptions.single('applicantPhoto'), async (req, res) =>{

    const file = req.file;
    if(!file) return res.status(400).send('No image in the request')
    
    const fileName = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/upload`;
    let applicant = new Applicant(
        {
            applicantId: req.body.applicantId,
            applicantName: req.body.applicantName, 
            citizenshipNumber: req.body.applicantCitizenshipNumber,
            applicantAddress: req.body.applicantAddress,
            applicantDOB: req.body.applicantDOB,
            applicantGender: req.body.applicantGender,
            applicantPhoto: `${basePath}${fileName}`, 
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