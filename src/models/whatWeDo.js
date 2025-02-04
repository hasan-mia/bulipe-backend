const mongoose = require("mongoose")

const WhatWeDoSchema = new mongoose.Schema(
    {
        localizedContent: {
            type: Map,
            of: {
                title: { type: String, required: true },
                description: { type: String, required: true },
            },
            required: true,
        },
        image: { type: String, required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model("WhatWeDo", WhatWeDoSchema)

