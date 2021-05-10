const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose =  require('mongoose');
const cors = require('cors');
require('dotenv/config');
const api = process.env.API_URL;
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler') ;





app.use(cors());
app.options('*', cors());


//middleware
app.use(bodyParser.json());
app.use( authJwt());
app.use(errorHandler);

//middleware HTTP loggers details
app.use(morgan('tiny'));


//improting routes
const applicantsRoutes = require('./routes/applicants');
const licenseRegistrationsRoutes = require('./routes/licenseRegistrations');
const permissionsRoutes = require('./routes/permissions');
const usersRoutes = require('./routes/users');



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