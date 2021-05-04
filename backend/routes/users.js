const {User} = require('../model/user');
const express = require('express');
const router = express.Router();


router.get(`/`, async (req, res) =>{
    const userList = await User.find();
    res.send(userList);
})

router.post(`/`,  (req,res)=>{
    const user = new User({
        userId: req.body.userId,
        userRole: req.body.userRole,
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userDOB: req.body.userDOB,
        userAddress: req.body.userAddress,
        userPassword: req.body.userPassword

    });

    user.save().then((createdUser => {
        res.status(201).json(createdUser)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })

})

module.exports =router;