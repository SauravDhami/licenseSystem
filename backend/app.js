const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose =  require('mongoose');

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

const applicantSchema = mongoose.Schema({
    name : String,
    image : String,
    countInStock : Number

})

const Applicant = mongoose.model('Applicant',applicantSchema);

require('dotenv/config');


const api = process.env.API_URL;

app.get(`${api}/products`,  (req,res)=>{
    const applicant = {
        id: 1,
        name: "barber",
        image: "url",
    }
    
    res.send(applicant);
})

app.post(`${api}/products`,  (req,res)=>{
    const applicant = new Applicant({
       name: req.body.name,
       image: req.body.image,
       countInStock: req.body.countInStock

    })

    applicant.save().then((createdApplicant => {
        res.status(201).json(createdApplicant)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })

})


mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'LicenseDB'
})
.then(()=>{
    console.log('Database Connection is ready.....');
})

.catch((err)=>{
    console.log(err);
})

app.listen(3000, ()=>{
    
    console.log('server is running http://localhost:3000');
})