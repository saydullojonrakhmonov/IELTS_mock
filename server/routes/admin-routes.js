const express = require('express');
const { createQuestion, getQuestions, getQuestionById, updateQuestion, deleteQuestion } = require('../controllers/admin/adminController.js');

const router = express.Router()

router.post("/questions", createQuestion);
router.get("/questions", getQuestions);
router.get("/questions/:id", getQuestionById);
router.put("/questions/:id", updateQuestion);
router.delete("/questions/:id", deleteQuestion);

module.exports = router