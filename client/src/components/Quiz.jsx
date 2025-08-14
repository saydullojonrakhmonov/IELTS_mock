import React, { useEffect, useState } from "react";
import axios from "axios";
import BASEURL from "../api";

function Quiz({ question, options, onAnswer, currentIndex, totalQuestions }) {
    const [selected, setSelected] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selected === null) return;
        onAnswer(selected);
        setSelected(null);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md border border-gray-100"
        >
            <div className="mb-4 flex justify-between items-center">
                <span className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Question {currentIndex + 1} of {totalQuestions}
                </span>
            </div>

            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                {question}
            </h2>

            <fieldset className="mt-5 space-y-3">
                {options.map((opt, idx) => (
                    <label
                        key={idx}
                        className={[
                            "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition",
                            selected === idx
                                ? "border-gray-900 bg-gray-50"
                                : "border-gray-200 hover:border-gray-300",
                        ].join(" ")}
                    >
                        <input
                            type="radio"
                            name="option"
                            className="h-4 w-4"
                            checked={selected === idx}
                            onChange={() => setSelected(idx)}
                        />
                        <span>{opt}</span>
                    </label>
                ))}
            </fieldset>

            <div className="mt-6 flex justify-end">
                <button
                    type="submit"
                    disabled={selected === null}
                    className="px-5 py-2.5 rounded-2xl bg-gray-900 text-white disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </form>
    );
}

export default function QuizDemo() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [finished, setFinished] = useState(false);
    const [result, setResult] = useState(null);
    const [started, setStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

    // Fetch questions only when quiz starts
    useEffect(() => {
        if (started) {
            axios.get(`${BASEURL}/user/test/start`)
                .then((res) => setQuestions(res.data))
                .catch((err) => console.error(err));
        }
    }, [started]);

    // Timer countdown
    useEffect(() => {
        if (!started || finished) return;

        if (timeLeft <= 0) {
            submitAnswers(answers); // Auto-submit when time runs out
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, started, finished]);

    const handleAnswer = (selectedIndex) => {
        const currentQ = questions[currentIndex];
        const optionLetters = ["A", "B", "C", "D"];

        const updatedAnswers = [
            ...answers,
            { question_id: currentQ.id, selected_option: optionLetters[selectedIndex] }
        ];

        setAnswers(updatedAnswers);

        if (currentIndex + 1 < questions.length) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            submitAnswers(updatedAnswers);
        }
    };

    const submitAnswers = async (finalAnswers) => {
        try {
            const res = await axios.post(`${BASEURL}/user/test/submit`, {
                user_id: 1,
                answers: finalAnswers,
            });
            setResult(res.data);
            setFinished(true);
        } catch (err) {
            console.error(err);
        }
    };

    const handleRestart = () => {
        setStarted(false);
        setCurrentIndex(0);
        setAnswers([]);
        setFinished(false);
        setResult(null);
        setTimeLeft(600);
    };

    // Start screen
    if (!started) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <button
                    onClick={() => setStarted(true)}
                    className="px-8 py-4 bg-gray-900 text-white text-lg rounded-2xl hover:bg-gray-800"
                >
                    Start Mock Test
                </button>
            </div>
        );
    }

    // Results screen
    if (finished && result) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-6 w-96 rounded-xl shadow text-center">
                    <h1 className="text-2xl font-bold mb-4">Mock Test Finished!</h1>
                    <p className="text-lg mb-2">
                        Correct answers:{" "}
                        <span className="font-semibold">
                            {result.correctCount} of {result.totalQuestions}
                        </span>
                    </p>
                    <p className="text-lg mb-6">
                        Score:{" "}
                        <span className="font-semibold">{Math.round(result.percentage)}%</span>
                    </p>
                    <button
                        onClick={handleRestart}
                        className="px-5 py-2.5 rounded-2xl bg-gray-900 text-white hover:bg-gray-800"
                    >
                        Restart Test
                    </button>
                </div>
            </div>
        );
    }

    // Loading
    if (questions.length === 0) {
        return <p className="text-center mt-10">Loading questions...</p>;
    }

    // Timer format MM:SS
    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0");
        const s = String(seconds % 60).padStart(2, "0");
        return `${m}:${s}`;
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="mx-auto max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold">IELTS Mock Test</h1>
                    <div className="bg-red-500 text-white px-4 py-2 rounded-lg">
                        {formatTime(timeLeft)}
                    </div>
                </div>

                <Quiz
                    question={questions[currentIndex].question_text}
                    options={[
                        questions[currentIndex].option_a,
                        questions[currentIndex].option_b,
                        questions[currentIndex].option_c,
                        questions[currentIndex].option_d,
                    ]}
                    onAnswer={handleAnswer}
                    currentIndex={currentIndex}
                    totalQuestions={questions.length}
                />
            </div>
        </div>
    );
}
