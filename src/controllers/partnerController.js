/* eslint-disable no-unused-vars */
const Partner = require("../models/partner")
const catchAsyncError = require("../middleware/catchAsyncError")
const ErrorHandler = require("../utils/errorhandler")

exports.createPartner = catchAsyncError(async (req, res, next) => {
    const partner = await Partner.create(req.body)
    res.status(201).json({
        success: true,
        partner,
    })
})

exports.getPartners = catchAsyncError(async (req, res, next) => {
    const { category, page = 1, limit = 10 } = req.query;

    // Ensure page and limit are positive numbers
    const pageNumber = Math.max(Number(page) || 1, 1);
    const pageSize = Math.max(Number(limit) || 10, 1);
    const skip = (pageNumber - 1) * pageSize;

    // Build query filter
    const query = category ? { category } : {};

    // Fetch partners with pagination
    const [partners, totalDocs] = await Promise.all([
        Partner.find(query).sort({ name: 1 }).skip(skip).limit(pageSize).lean(),
        Partner.countDocuments(query),
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(totalDocs / pageSize);

    res.status(200).json({
        success: true,
        data: partners,
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


exports.updatePartner = catchAsyncError(async (req, res, next) => {
    let partner = await Partner.findById(req.params.id)
    if (!partner) {
        return next(new ErrorHandler("Partner not found", 404))
    }
    partner = await Partner.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    res.status(200).json({
        success: true,
        partner,
    })
})

exports.deletePartner = catchAsyncError(async (req, res, next) => {
    const partner = await Partner.findByIdAndDelete(req.params.id)
    if (!partner) {
        return next(new ErrorHandler("Partner not found", 404))
    }
    res.status(200).json({
        success: true,
        message: "Partner deleted successfully",
    })
})

