const express = require("express")
const router = express.Router()
const { createWhatWeDo, getWhatWeDo, updateWhatWeDo, deleteWhatWeDo } = require("../controllers/whatWeDoController")

router.route("/what-we-do").post(createWhatWeDo).get(getWhatWeDo)
router.route("/what-we-do/:id").put(updateWhatWeDo).delete(deleteWhatWeDo)

module.exports = router

