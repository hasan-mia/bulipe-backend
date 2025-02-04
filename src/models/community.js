const mongoose = require("mongoose")

const CommunitySchema = new mongoose.Schema(
    {
        localizedContent: {
            type: Map,
            of: {
                label: { type: String, required: true },
            },
            required: true,
        },
        value: { type: Number, required: true },
        icon: { type: String },
    },
    { timestamps: true },
)

module.exports = mongoose.model("Community", CommunitySchema)

