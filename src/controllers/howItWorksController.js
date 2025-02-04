/* eslint-disable no-unused-vars */
const HowItWorks = require("../models/howItWorks")
const catchAsyncError = require("../middleware/catchAsyncError")
const ErrorHandler = require("../utils/errorhandler")

exports.createHowItWorks = catchAsyncError(async (req, res, next) => {
    const howItWorks = await HowItWorks.create(req.body)
    res.status(201).json({
        success: true,
        data: howItWorks,
    })
})

exports.getHowItWorks = catchAsyncError(async (req, res, next) => {
    const howItWorks = await HowItWorks.findOne({ isActive: true })
    if (!howItWorks) {
        return next(new ErrorHandler("Active How It Works section not found", 404))
    }
    res.status(200).json({
        success: true,
        data: howItWorks,
    })
})

exports.updateHowItWorks = catchAsyncError(async (req, res, next) => {
    let howItWorks = await HowItWorks.findById(req.params.id)
    if (!howItWorks) {
        return next(new ErrorHandler("How It Works section not found", 404))
    }
    howItWorks = await HowItWorks.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    res.status(200).json({
        success: true,
        data: howItWorks,
    })
})

exports.deleteHowItWorks = catchAsyncError(async (req, res, next) => {
    const howItWorks = await HowItWorks.findByIdAndDelete(req.params.id)
    if (!howItWorks) {
        return next(new ErrorHandler("How It Works section not found", 404))
    }
    res.status(200).json({
        success: true,
        message: "How It Works section deleted successfully",
    })
})

