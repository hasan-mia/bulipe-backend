/* eslint-disable no-unused-vars */
const WhatWeDo = require("../models/whatWeDo")
const catchAsyncError = require("../middleware/catchAsyncError")
const ErrorHandler = require("../utils/errorhandler")

exports.createWhatWeDo = catchAsyncError(async (req, res, next) => {
    const whatWeDo = await WhatWeDo.create(req.body)
    res.status(201).json({
        success: true,
        data: whatWeDo,
    })
})

exports.getWhatWeDo = catchAsyncError(async (req, res, next) => {
    const whatWeDo = await WhatWeDo.findOne({ isActive: true })
    if (!whatWeDo) {
        return next(new ErrorHandler("Active What We Do section not found", 404))
    }
    res.status(200).json({
        success: true,
        data: whatWeDo,
    })
})

exports.updateWhatWeDo = catchAsyncError(async (req, res, next) => {
    let whatWeDo = await WhatWeDo.findById(req.params.id)
    if (!whatWeDo) {
        return next(new ErrorHandler("What We Do section not found", 404))
    }
    whatWeDo = await WhatWeDo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    res.status(200).json({
        success: true,
        data: whatWeDo,
    })
})

exports.deleteWhatWeDo = catchAsyncError(async (req, res, next) => {
    const whatWeDo = await WhatWeDo.findByIdAndDelete(req.params.id)
    if (!whatWeDo) {
        return next(new ErrorHandler("What We Do section not found", 404))
    }
    res.status(200).json({
        success: true,
        message: "What We Do section deleted successfully",
    })
})

