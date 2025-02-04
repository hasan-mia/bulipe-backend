const express = require("express")
const router = express.Router()
const { createNews, getNews, getSingleNews, updateNews, deleteNews } = require("../controllers/newsController")
const { isAuthenticated } = require("../middleware/auth")

router.route("/news").post(isAuthenticated, createNews).get(getNews)
router.route("/news/:id").get(getSingleNews).put(updateNews).delete(deleteNews)

module.exports = router

