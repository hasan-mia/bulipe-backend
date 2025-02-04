const express = require("express")
const router = express.Router()
const {
    createHowItWorks,
    getHowItWorks,
    updateHowItWorks,
    deleteHowItWorks,
} = require("../controllers/howItWorksController")

router.route("/how-it-works").post(createHowItWorks).get(getHowItWorks)
router.route("/how-it-works/:id").put(updateHowItWorks).delete(deleteHowItWorks)

module.exports = router

