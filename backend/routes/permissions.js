const {Permission} = require('../model/permission');
const express = require('express');
const router = express.Router();


router.get(`/`, async (req, res) =>{
    const permissionList = await Permission.find();
    res.send(permissionList);
})

router.post(`/`,  (req,res)=>{
    const permission = new Permission({
        permissionId: req.body.permissionId,
        permissionRoleId: req.body.permissionRoleId,
        permissionTitle: req.body.permissionTitle

    });

    permission.save().then((createdPermission => {
        res.status(201).json(createdPermission)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })

})

module.exports =router;