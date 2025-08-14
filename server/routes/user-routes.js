const express = require('express')
const { startTest, submitTest, getUserResults } = require('../controllers/user/userController')

const router = express.Router()

router.get("/test/start", startTest)
router.post("/test/submit", submitTest)
router.get("/test/start", startTest)
router.get("/results/:user_id", getUserResults)

module.exports = router