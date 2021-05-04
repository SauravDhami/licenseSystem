const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose =  require('mongoose');
require('dotenv/config');
const api = process.env.API_URL;

//improting routes
const applicantsRoutes = require('./routes/applicants');
const licenseRegistrationsRoutes = require('./routes/licenseRegistrations');
const permissionsRoutes = require('./routes/permissions');
const usersRoutes = require('./routes/users');

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

//routers
app.use(`${api}/applicants`, applicantsRoutes);
app.use(`${api}/licenseRegistrations`, licenseRegistrationsRoutes);
app.use(`${api}/permissions`, permissionsRoutes);
app.use(`${api}/users`, usersRoutes);


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