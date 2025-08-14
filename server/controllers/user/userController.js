const pool = require("../../config/db");

//  start test
const startTest = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT id, question_text, option_a, option_b, option_c, option_d
            FROM questions
            ORDER BY RANDOM()
            LIMIT 10
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
};

// submit test
const submitTest = async (req, res) => {
    const { user_id, answers } = req.body;

    if (!user_id || !answers) {
        return res.status(400).json({ error: "Invalid request data" });
    }

    try {
        let correctCount = 0;

        for (const answer of answers) {
            const questionRes = await pool.query(
                `SELECT correct_answer FROM questions WHERE id = $1`,
                [answer.question_id]
            );

            if (questionRes.rows.length === 0) continue;

            const q = questionRes.rows[0];
            const isCorrect = answer.selected_option === q.correct_answer;

            if (isCorrect) correctCount++;

            await pool.query(
                `INSERT INTO user_answers (user_id, question_id, selected_option, is_correct)
                 VALUES ($1, $2, $3, $4)`,
                [user_id, answer.question_id, answer.selected_option, isCorrect]
            );
        }

        const totalQuestions = answers.length;
        const percentage = ((correctCount / totalQuestions) * 100).toFixed(2);

        res.json({
            message: `You got ${correctCount} of ${totalQuestions} correct.`,
            correctCount,
            totalQuestions,
            percentage
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
};




//  get previous test results
const getUserResults = async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await pool.query(
            `SELECT question_id, selected_option, is_correct, created_at
             FROM user_answers
             WHERE user_id = $1
             ORDER BY created_at DESC`,
            [user_id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
};

module.exports = {
    startTest,
    submitTest,
    getUserResults
};
