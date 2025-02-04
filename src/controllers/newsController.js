/* eslint-disable no-unused-vars */
const News = require("../models/news")
const catchAsyncError = require("../middleware/catchAsyncError")
const ErrorHandler = require("../utils/errorhandler")

exports.createNews = catchAsyncError(async (req, res, next) => {
    const newData = req.body;
    const finalData = {
        ...newData,
        author: req.user.id,
    }
    const news = await News.create(req.body)
    res.status(201).json({
        success: true,
        data: news,
    })
})

exports.getNews = catchAsyncError(async (req, res, next) => {
    const { keyword, language = "en", page = 1, limit = 10 } = req.query;
    const query = {};

    if (keyword) {
        query.$or = [
            { [`localizedContent.${language}.title`]: { $regex: keyword, $options: "i" } },
            { [`localizedContent.${language}.description`]: { $regex: keyword, $options: "i" } } // Fixed key (was "shortDescription")
        ];
    }

    const totalDocs = await News.countDocuments(query);
    const news = await News.find(query)
        .sort({ publishDate: -1 }) // Sort by newest first
        .skip((page - 1) * limit) // Pagination logic
        .limit(Number(limit));

    res.status(200).json({
        success: true,
        data: news,
        pagination: {
            total: totalDocs,
            page: Number(page),
            pages: Math.ceil(totalDocs / limit),
            limit: Number(limit),
        },
    });
});


exports.getSingleNews = catchAsyncError(async (req, res, next) => {
    const news = await News.findById(req.params.id)
    if (!news) {
        return next(new ErrorHandler("News article not found", 404))
    }
    res.status(200).json({
        success: true,
        news,
    })
})

// Current behavior (problematic) - will remove other languages
exports.updateNews = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;

    let news = await News.findById(id);
    if (!news) {
        return next(new ErrorHandler("News article not found", 404));
    }

    // This will replace the entire localizedContent if provided
    news = await News.findByIdAndUpdate(
        id,
        { $set: updateData },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        success: true,
        news,
    });
});

// Corrected version - preserves other languages
exports.updateNews = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;

    let news = await News.findById(id);
    if (!news) {
        return next(new ErrorHandler("News article not found", 404));
    }

    // Special handling for localizedContent to preserve other languages
    if (updateData.localizedContent) {
        const currentLocalizedContent = news.localizedContent.toObject();

        // Merge the new language content with existing content
        for (const [lang, content] of Object.entries(updateData.localizedContent)) {
            currentLocalizedContent[lang] = {
                ...currentLocalizedContent[lang],
                ...content
            };
        }

        updateData.localizedContent = currentLocalizedContent;
    }

    news = await News.findByIdAndUpdate(
        id,
        { $set: updateData },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        success: true,
        news,
    });
});

exports.deleteNews = catchAsyncError(async (req, res, next) => {
    const news = await News.findByIdAndDelete(req.params.id)
    if (!news) {
        return next(new ErrorHandler("News article not found", 404))
    }
    res.status(200).json({
        success: true,
        message: "News article deleted successfully",
    })
})

