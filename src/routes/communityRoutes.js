const express = require("express")
const { getCommunities, getCommunity, updateCommunity, createCommunity, deleteCommunity } = require("../controllers/communityController")
const router = express.Router()


router.route("/community").post(createCommunity).get(getCommunities)
router.route("/community/:id").get(getCommunity).put(updateCommunity).delete(deleteCommunity)

module.exports = router

