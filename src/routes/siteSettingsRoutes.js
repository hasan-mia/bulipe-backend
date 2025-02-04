const express = require("express")
const router = express.Router()
const { createSiteSettings, getSiteSettings, updateSiteSettings } = require("../controllers/siteSettingsController")

router.route("/site-settings").post(createSiteSettings).get(getSiteSettings).put(updateSiteSettings)

module.exports = router

