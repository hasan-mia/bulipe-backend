/* eslint-disable no-unused-vars */
const Community = require("../models/community")
const catchAsyncError = require("../middleware/catchAsyncError")
const ErrorHandler = require("../utils/errorhandler")

exports.createCommunity = catchAsyncError(async (req, res, next) => {
    const community = await Community.create(req.body)
    res.status(201).json({
        success: true,
        data: community,
    })
})

exports.getCommunities = catchAsyncError(async (req, res, next) => {
    const communities = await Community.find()
    res.status(200).json({
        success: true,
        data: communities,
    })
})

exports.getCommunity = catchAsyncError(async (req, res, next) => {
    const community = await Community.findById(req.params.id)
    if (!community) {
        return next(new ErrorHandler("Community stat not found", 404))
    }
    res.status(200).json({
        success: true,
        data: community,
    })
})

exports.updateCommunity = catchAsyncError(async (req, res, next) => {
    let community = await Community.findById(req.params.id)
    if (!community) {
        return next(new ErrorHandler("Community stat not found", 404))
    }
    community = await Community.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    res.status(200).json({
        success: true,
        data: community,
    })
})

exports.deleteCommunity = catchAsyncError(async (req, res, next) => {
    const community = await Community.findByIdAndDelete(req.params.id)
    if (!community) {
        return next(new ErrorHandler("Community stat not found", 404))
    }
    res.status(200).json({
        success: true,
        message: "Community stat deleted successfully",
    })
})

