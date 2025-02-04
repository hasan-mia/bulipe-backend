const express = require("express")
const router = express.Router()
const { createHero, getHero, updateHero, deleteHero } = require("../controllers/heroController")

router.route("/hero").post(createHero).get(getHero)
router.route("/hero/:id").put(updateHero).delete(deleteHero)

module.exports = router

