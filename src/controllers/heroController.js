/* eslint-disable no-unused-vars */
const catchAsyncError = require("../middleware/catchAsyncError")
const ErrorHandler = require("../utils/errorhandler")
const Hero = require('../models/hero');

exports.createHero = catchAsyncError(async (req, res, next) => {
    const hero = await Hero.create(req.body)
    res.status(201).json({
        success: true,
        hero,
    })
})

exports.getHero = catchAsyncError(async (req, res, next) => {
    const hero = await Hero.findOne({ isActive: true })
    if (!hero) {
        return next(new ErrorHandler("Active hero not found", 404))
    }
    res.status(200).json({
        success: true,
        hero,
    })
})

exports.updateHero = catchAsyncError(async (req, res, next) => {
    let hero = await Hero.findById(req.params.id)
    if (!hero) {
        return next(new ErrorHandler("Hero not found", 404))
    }
    hero = await Hero.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    res.status(200).json({
        success: true,
        hero,
    })
})

exports.deleteHero = catchAsyncError(async (req, res, next) => {
    const hero = await Hero.findByIdAndDelete(req.params.id)
    if (!hero) {
        return next(new ErrorHandler("Hero not found", 404))
    }

    res.status(200).json({
        success: true,
        message: "Hero deleted successfully",
    })
})

