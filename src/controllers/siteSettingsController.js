/* eslint-disable no-unused-vars */
const SiteSettings = require("../models/siteSettings")
const catchAsyncError = require("../middleware/catchAsyncError")
const ErrorHandler = require("../utils/errorhandler")

exports.createSiteSettings = catchAsyncError(async (req, res, next) => {
    const siteSettings = await SiteSettings.create(req.body)
    res.status(201).json({
        success: true,
        data: siteSettings,
    })
})

exports.getSiteSettings = catchAsyncError(async (req, res, next) => {
    const siteSettings = await SiteSettings.findOne()
    if (!siteSettings) {
        return next(new ErrorHandler("Site settings not found", 404))
    }
    res.status(200).json({
        success: true,
        data: siteSettings,
    })
})

exports.updateSiteSettings = catchAsyncError(async (req, res, next) => {
    let siteSettings = await SiteSettings.findOne()
    if (!siteSettings) {
        return next(new ErrorHandler("Site settings not found", 404))
    }
    siteSettings = await SiteSettings.findOneAndUpdate({}, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    res.status(200).json({
        success: true,
        data: siteSettings,
    })
})

