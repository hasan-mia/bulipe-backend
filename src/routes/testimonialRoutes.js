const express = require("express")
const router = express.Router()
const {
    createTestimonial,
    getTestimonials,
    getTestimonial,
    updateTestimonial,
    deleteTestimonial,
} = require("../controllers/testimonialController")

router.route("/testimonials").post(createTestimonial).get(getTestimonials)
router.route("/testimonials/:id").get(getTestimonial).put(updateTestimonial).delete(deleteTestimonial)

module.exports = router

