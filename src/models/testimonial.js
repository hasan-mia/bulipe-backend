const mongoose = require("mongoose")

const TestimonialSchema = new mongoose.Schema(
    {
        localizedContent: {
            type: Map,
            of: {
                quote: { type: String, required: true },
            },
            required: true,
        },
        author: { type: String, required: true },
        avatar: { type: String },
        role: { type: String },
        company: { type: String },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model("Testimonial", TestimonialSchema)

