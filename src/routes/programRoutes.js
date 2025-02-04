const express = require("express")
const router = express.Router()
const {
    createProgram,
    getPrograms,
    getProgram,
    updateProgram,
    deleteProgram,
} = require("../controllers/progamController")

router.route("/programs").post(createProgram).get(getPrograms)
router.route("/programs/:id").get(getProgram).put(updateProgram).delete(deleteProgram)

module.exports = router

