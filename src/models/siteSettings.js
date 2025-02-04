const mongoose = require("mongoose")

const SiteSettingsSchema = new mongoose.Schema(
    {
        localizedContent: {
            type: Map,
            of: {
                siteTitle: String,
                siteDescription: String,
                footerText: String,
                contactEmail: String,
                contactPhone: String,
                address: String,
            },
            required: true,
        },
        logo: { type: String, required: true },
        socialLinks: {
            facebook: String,
            twitter: String,
            linkedin: String,
            youtube: String,
            instagram: String,
        },
        googleAnalyticsId: String,
        defaultLanguage: { type: String, default: "en" },
    },
    { timestamps: true },
)

module.exports = mongoose.model("SiteSettings", SiteSettingsSchema)

