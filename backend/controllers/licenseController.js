const LicenseRegistration = require('../model/licenseRegistration');
const catchAsync = require('../helpers/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../helpers/appError');

exports.getAllUserLicenseRegistration = catchAsync(async (req, res, next) => {
    const licenseRegistrationList = await LicenseRegistration.find({ userName: req.user.id })
        .populate('appliedBy', 'userName')
        .populate({
            path: 'applicantName',
            select: 'applicantName',
        });

    if (!licenseRegistrationList) {
        return next(new AppError('No LicenseRegistration found!', 404));
    }

    res.status(200).json({
        status: 'success',
        results: licenseRegistrationList.length,
        data: {
            licenseRegistrationList,
        },
    });
});

exports.getAllLicenseRegistration = catchAsync(async (req, res, next) => {
    const licenseRegistrationList = await LicenseRegistration.find()
        .populate('appliedBy', 'userName')
        .populate({
            path: 'applicant',
            select: 'applicantName transportationOffice',
        });

    if (!licenseRegistrationList) {
        return next(new AppError('No licenseRegistrations found!', 404));
    }

    res.status(200).json({
        status: 'success',
        results: licenseRegistrationList.length,
        data: {
            licenseRegistrationList,
        },
    });
});

exports.getLicenseRegistration = catchAsync(async (req, res, next) => {
    const licenseRegistration = await LicenseRegistration.findById(req.params.id)
        .populate('appliedBy', 'userName')
        .populate({
            path: 'applicant',
            select: 'applicantName transportationOffice',
        });

    if (!licenseRegistration) {
        return next(new AppError('No licenseRegistration found with that id!', 404));
    }

    res.status(200).json({
        status: 'success',
        results: licenseRegistration.length,
        data: {
            licenseRegistration,
        },
    });
});

exports.addLicenseRegistration = catchAsync(async (req, res, next) => {
    const { file } = req;
    if (!file) return res.status(400).send('No image in the request');

    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    let licenseRegistration = new LicenseRegistration({
           
            applicant: req.params.applicantId,
            userName: req.user.id,
            registrationDate: req.body.registrationDate,
            examinationDate: req.body.examinationDate,
          
    });

    licenseRegistration = await licenseRegistration.save();

    if (!licenseRegistration) {
        return next(new AppError('The licenseRegistration cannot be issued!', 404));
    }

    res.status(201).json({
        status: 'success',
        results: licenseRegistration.length,
        data: {
            licenseRegistration,
        },
    });
});

exports.createLicenseRegistration = factory.createOne(LicenseRegistration);

exports.updateLicenseRegistration = factory.updateOne(LicenseRegistration);

exports.deleteLicenseRegistration = factory.deleteOne(LicenseRegistration);