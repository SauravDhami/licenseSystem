const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose =  require('mongoose');

const api = process.env.API_URL;


const applicantsRouter = require('./routers/applicants');

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

//routers
app.use(`${api}/applicants`,applicantsRouter)

require('dotenv/config');







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