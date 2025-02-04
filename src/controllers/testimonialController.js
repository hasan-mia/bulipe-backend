/* eslint-disable no-unused-vars */
const Testimonial = require("../models/testimonial")
const catchAsyncError = require("../middleware/catchAsyncError")
const ErrorHandler = require("../utils/errorhandler")

exports.createTestimonial = catchAsyncError(async (req, res, next) => {
    const testimonial = await Testimonial.create(req.body)
    res.status(201).json({
        success: true,
        testimonial,
    })
})

exports.getTestimonials = catchAsyncError(async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query;

    // Ensure page and limit are valid numbers
    const pageNumber = Math.max(Number(page) || 1, 1);
    const pageSize = Math.max(Number(limit) || 10, 1);
    const skip = (pageNumber - 1) * pageSize;

    // Fetch testimonials with pagination
    const [testimonials, totalDocs] = await Promise.all([
        Testimonial.find().sort({ createdAt: -1 }).skip(skip).limit(pageSize).lean(),
        Testimonial.countDocuments(),
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(totalDocs / pageSize);

    res.status(200).json({
        success: true,
        testimonials,
        pagination: {
            totalDocs,
            currentPage: pageNumber,
            totalPages,
            limit: pageSize,
            hasNextPage: pageNumber < totalPages,
            hasPrevPage: pageNumber > 1,
            nextPage: pageNumber < totalPages ? pageNumber + 1 : null,
            prevPage: pageNumber > 1 ? pageNumber - 1 : null,
        },
    });
});

exports.getTestimonial = catchAsyncError(async (req, res, next) => {
    const testimonial = await Testimonial.findById(req.params.id)
    if (!testimonial) {
        return next(new ErrorHandler("Testimonial not found", 404))
    }
    res.status(200).json({
        success: true,
        testimonial,
    })
})

exports.updateTestimonial = catchAsyncError(async (req, res, next) => {
    let testimonial = await Testimonial.findById(req.params.id)
    if (!testimonial) {
        return next(new ErrorHandler("Testimonial not found", 404))
    }
    testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    res.status(200).json({
        success: true,
        testimonial,
    })
})

exports.deleteTestimonial = catchAsyncError(async (req, res, next) => {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id)
    if (!testimonial) {
        return next(new ErrorHandler("Testimonial not found", 404))
    }
    res.status(200).json({
        success: true,
        message: "Testimonial deleted successfully",
    })
})

