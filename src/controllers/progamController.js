const catchAsyncError = require('../middleware/catchAsyncError');
const Program = require('../models/program');
const ErrorHandler = require('../utils/errorhandler');

// Create Program
exports.createProgram = catchAsyncError(async (req, res, next) => {
    const newData = req.body;
    try {
        const program = new Program(newData);
        await program.save();

        res.status(201).json({
            success: true,
            message: 'Program created successfully',
            data: program,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// Update Program
exports.updateProgram = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;

    let program = await Program.findById(id);
    if (!program) {
        return next(new ErrorHandler("Program not found", 404));
    }

    if (updateData.localizedContent) {
        const currentLocalizedContent = program.localizedContent.toObject();

        for (const [lang, content] of Object.entries(updateData.localizedContent)) {
            currentLocalizedContent[lang] = {
                ...currentLocalizedContent[lang],
                ...content
            };
        }

        updateData.localizedContent = currentLocalizedContent;
    }

    const updateFields = {};
    for (const key in updateData) {
        if (updateData[key] !== undefined && updateData[key] !== null) {
            updateFields[key] = updateData[key];
        }
    }

    // Only update if there are fields to update
    if (Object.keys(updateFields).length > 0) {
        program = await Program.findByIdAndUpdate(
            id,
            { $set: updateFields },
            {
                new: true,
                runValidators: true,
            }
        );
    }

    res.status(200).json({
        success: true,
        message: 'Program updated successfully',
        data: program
    });
});

// Delete Program
exports.deleteProgram = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedProgram = await Program.findByIdAndDelete(id);

        if (!deletedProgram) {
            return next(new ErrorHandler('Program not found', 404));
        }

        res.status(200).json({
            success: true,
            message: 'Program deleted successfully'
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// Get Single Program
exports.getProgram = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    try {
        const program = await Program.findById(id);

        if (!program) {
            return next(new ErrorHandler('Program not found', 404));
        }

        res.status(200).json({
            success: true,
            message: 'Program found successfully',
            data: program
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// Get Programs with filtering and pagination
exports.getPrograms = catchAsyncError(async (req, res, next) => {
    const { keyword, category, minPrice, maxPrice, startDate, language, page = 1, limit = 10, sortBy = "createdAt", sortOrder = -1 } = req.query;

    try {
        const query = {};

        // Search for programs based on keyword (title or description)
        if (keyword) {
            query.$or = [
                { [`localizedContent.${language}.title`]: { $regex: keyword, $options: 'i' } },
                { [`localizedContent.${language}.description`]: { $regex: keyword, $options: 'i' } }
            ];
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Price range filtering
        if (minPrice !== undefined || maxPrice !== undefined) {
            query.price = {};
            if (minPrice !== undefined) query.price.$gte = Number(minPrice);
            if (maxPrice !== undefined) query.price.$lte = Number(maxPrice);
        }

        // Filter by start date (e.g., programs starting after a certain date)
        if (startDate) {
            query.startDates = { $gte: new Date(startDate) };
        }

        // Define the sorting field and order
        const sort = {};
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

        // Pagination settings using skip and limit
        const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
        const limitValue = parseInt(limit, 10);

        // Fetch the programs with skip and limit
        const programs = await Program.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limitValue);

        // Get total count for pagination
        const totalPrograms = await Program.countDocuments(query);

        res.status(200).json({
            success: true,
            data: programs,
            pagination: {
                total: totalPrograms,
                page: parseInt(page, 10),
                pages: Math.ceil(totalPrograms / limitValue),
                limit: limitValue
            }
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});
