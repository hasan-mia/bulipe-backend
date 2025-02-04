const express = require("express")
const router = express.Router()
const {
    createPartner,
    getPartners,
    updatePartner,
    deletePartner,
} = require("../controllers/partnerController")

router.route("/partners").post(createPartner).get(getPartners)
router.route("/partners/:id").put(updatePartner).delete(deletePartner)

module.exports = router

