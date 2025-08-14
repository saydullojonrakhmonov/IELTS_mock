import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminQuestions() {
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({
    question_text: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_answer: "A",
  });
  const [editId, setEditId] = useState(null);

  // Fetch questions
  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/questions");
      setQuestions(res.data);
    } catch (error) {
      console.error("Error fetching questions", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:3000/admin/questions/${editId}`, form);
      } else {
        await axios.post("http://localhost:3000/admin/questions", form);
      }
      resetForm();
      fetchQuestions();
    } catch (error) {
      console.error("Error saving question", error);
    }
  };

  // Edit
  const handleEdit = (q) => {
    setForm({
      question_text: q.question_text,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      option_d: q.option_d,
      correct_answer: q.correct_answer,
    });
    setEditId(q.id);
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      await axios.delete(`http://localhost:3000/admin/questions/${id}`);
      fetchQuestions();
    }
  };

  const resetForm = () => {
    setForm({
      question_text: "",
      option_a: "",
      option_b: "",
      option_c: "",
      option_d: "",
      correct_answer: "A",
    });
    setEditId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Manage Questions</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 space-y-3"
      >
        <input
          type="text"
          name="question_text"
          placeholder="Question text"
          value={form.question_text}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="option_a"
            placeholder="Option A"
            value={form.option_a}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="option_b"
            placeholder="Option B"
            value={form.option_b}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="option_c"
            placeholder="Option C"
            value={form.option_c}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="option_d"
            placeholder="Option D"
            value={form.option_d}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <select
          name="correct_answer"
          value={form.correct_answer}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="A">Correct Answer: A</option>
          <option value="B">Correct Answer: B</option>
          <option value="C">Correct Answer: C</option>
          <option value="D">Correct Answer: D</option>
        </select>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editId ? "Update Question" : "Add Question"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Question</th>
            <th className="p-2 border">A</th>
            <th className="p-2 border">B</th>
            <th className="p-2 border">C</th>
            <th className="p-2 border">D</th>
            <th className="p-2 border">Correct</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id} className="border-b">
              <td className="p-2 border">{q.id}</td>
              <td className="p-2 border">{q.question_text}</td>
              <td className="p-2 border">{q.option_a}</td>
              <td className="p-2 border">{q.option_b}</td>
              <td className="p-2 border">{q.option_c}</td>
              <td className="p-2 border">{q.option_d}</td>
              <td className="p-2 border">{q.correct_answer}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleEdit(q)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(q.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
