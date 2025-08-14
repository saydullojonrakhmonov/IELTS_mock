const pool = require("../../config/db");

// Create Question
const createQuestion = async (req, res) => {
    const { question_text, option_a, option_b, option_c, option_d, correct_answer } = req.body;

    if (!question_text || !option_a || !option_b || !option_c || !option_d || !correct_answer) {
        return res.status(400).json({ error: 'Please enter all values' });
    }

    if (!['A', 'B', 'C', 'D'].includes(correct_answer)) {
        return res.status(400).json({ error: 'Correct answer must be A, B, C, or D' });
    }

    try {
        const result = await pool.query(
            `INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_answer)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [question_text, option_a, option_b, option_c, option_d, correct_answer]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Database Insert Error:", err);
        res.status(500).json({ error: 'Database error' });
    }
};

// Get All Questions
const getQuestions = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM questions ORDER BY id ASC`);
        res.json(result.rows);
    } catch (err) {
        console.error("Database Fetch Error:", err);
        res.status(500).json({ error: 'Database error' });
    }
};

// Get Question by ID
const getQuestionById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`SELECT * FROM questions WHERE id = $1`, [id]);
        if (!result.rows.length) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Database Fetch Error:", err);
        res.status(500).json({ error: 'Database error' });
    }
};

// Update Question
const updateQuestion = async (req, res) => {
    const { id } = req.params;
    const { question_text, option_a, option_b, option_c, option_d, correct_answer } = req.body;

    if (!question_text || !option_a || !option_b || !option_c || !option_d || !correct_answer) {
        return res.status(400).json({ error: 'Please enter all values' });
    }

    if (!['A', 'B', 'C', 'D'].includes(correct_answer)) {
        return res.status(400).json({ error: 'Correct answer must be A, B, C, or D' });
    }

    try {
        const result = await pool.query(
            `UPDATE questions
             SET question_text = $1, option_a = $2, option_b = $3, option_c = $4, option_d = $5, correct_answer = $6
             WHERE id = $7 RETURNING *`,
            [question_text, option_a, option_b, option_c, option_d, correct_answer, id]
        );
        if (!result.rows.length) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Database Update Error:", err);
        res.status(500).json({ error: 'Database error' });
    }
};

// Delete Question
const deleteQuestion = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`DELETE FROM questions WHERE id = $1 RETURNING *`, [id]);
        if (!result.rows.length) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.json({ message: 'Question deleted successfully' });
    } catch (err) {
        console.error("Database Delete Error:", err);
        res.status(500).json({ error: 'Database error' });
    }
};

module.exports = {
    createQuestion,
    getQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion
};
