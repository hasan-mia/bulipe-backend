const mongoose = require("mongoose")

const HeroSchema = new mongoose.Schema(
    {
        localizedContent: {
            type: Map,
            of: {
                title: { type: String, required: true },
                subtitle: { type: String, required: true },
                ctaText: { type: String, required: true },
                ctaLink: { type: String, required: true },
            },
            required: true,
        },
        backgroundImage: { type: String, required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model("Hero", HeroSchema)

