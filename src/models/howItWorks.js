const mongoose = require("mongoose")

const StepSchema = new mongoose.Schema({
    localizedContent: {
        type: Map,
        of: {
            title: { type: String, required: true },
            description: { type: String, required: true },
        },
        required: true,
    },
    icon: { type: String, required: false },
    order: { type: Number, required: false },
})

const HowItWorksSchema = new mongoose.Schema(
    {
        localizedContent: {
            type: Map,
            of: {
                title: { type: String, required: true },
            },
            required: true,
        },
        steps: [StepSchema],
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model("HowItWork", HowItWorksSchema)

