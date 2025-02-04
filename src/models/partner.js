const mongoose = require("mongoose")

const PartnerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        logo: { type: String, required: true },
        website: { type: String },
        category: { type: String, required: true }, // e.g., 'Training Partner', 'Hiring Partner'
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model("Partner", PartnerSchema)

