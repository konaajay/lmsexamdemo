import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionForm from "../components/QuestionForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateExam = () => {
  const navigate = useNavigate();
  const [examType, setExamType] = useState("quiz");
  const [questions, setQuestions] = useState([]);

  // Form State
  const [examName, setExamName] = useState("");
  const [course, setCourse] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [duration, setDuration] = useState("");

  const addQuestion = (question) => {
    setQuestions((prev) => [...prev, question]);
    toast.success("Question added!", { autoClose: 1000, position: "bottom-right" });
  };

  const handleSave = () => {
    if (!examName || !course) {
      toast.error("Please fill in the Exam Name and Course.");
      return;
    }

    const newExam = {
      id: Date.now(), // simple unique id
      title: examName,
      course: course,
      type: examType,
      totalMarks: totalMarks,
      duration: duration,
      questions: questions,
      dateCreated: new Date().toISOString()
    };

    // Save to LocalStorage
    const existingExams = JSON.parse(localStorage.getItem("exams")) || [];
    const updatedExams = [...existingExams, newExam];
    localStorage.setItem("exams", JSON.stringify(updatedExams));

    toast.success("Exam created successfully! Redirecting...");

    // Redirect to View Paper
    setTimeout(() => {
      navigate(`/exam/view-paper/${newExam.id}`);
    }, 1500);
  };

  return (
    <div className="card shadow-sm border-0">
      <ToastContainer />
      <div className="card-header bg-white py-3">
        <h5 className="mb-0 fw-bold">Create Exam</h5>
      </div>

      <div className="card-body">
        {/* Exam Meta */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Exam Name</label>
            <input
              className="form-control"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              placeholder="e.g. Final Semester Java"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Course</label>
            <input
              className="form-control"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="e.g. CS-101"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Exam Type</label>
            <select
              className="form-select"
              value={examType}
              onChange={(e) => {
                setExamType(e.target.value);
                setQuestions([]); // reset when type changes
              }}
            >
              <option value="quiz">Quiz</option>
              <option value="short">Short Answer</option>
              <option value="long">Long Answer</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Total Marks</label>
            <input
              type="number"
              className="form-control"
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Duration (min)</label>
            <input
              type="number"
              className="form-control"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
        </div>

        <hr />

        <h5>Add Questions</h5>

        {examType === "quiz" && (
          <QuestionForm type="quiz" onAdd={addQuestion} />
        )}
        {examType === "short" && (
          <QuestionForm type="short" onAdd={addQuestion} />
        )}
        {examType === "long" && (
          <QuestionForm type="long" onAdd={addQuestion} />
        )}
        {examType === "mixed" && (
          <>
            <p className="text-muted small">Add different types of questions below:</p>
            <div className="mb-3">
              <h6 className="text-primary">Multiple Choice</h6>
              <QuestionForm type="quiz" onAdd={addQuestion} />
            </div>
            <div className="mb-3">
              <h6 className="text-primary">Short Answer</h6>
              <QuestionForm type="short" onAdd={addQuestion} />
            </div>
          </>
        )}

        {/* Added Questions */}
        <hr />
        <h5>Added Questions ({questions.length})</h5>

        {questions.length === 0 && (
          <p className="text-muted">No questions added yet.</p>
        )}

        <ul className="list-group mb-3">
          {questions.map((q, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <span className="badge bg-secondary me-2">{q.type}</span>
                {q.question}
                {q.image && (
                  <div className="mt-2">
                    <img src={q.image} alt="Question" className="img-thumbnail" style={{ height: '50px' }} />
                  </div>
                )}
              </div>
              <button className="btn btn-sm btn-outline-danger" onClick={() => setQuestions(questions.filter((_, i) => i !== index))}>
                <i className="bi bi-trash"></i>
              </button>
            </li>
          ))}
        </ul>

        <button className="btn btn-primary mt-3 w-100 fw-bold" onClick={handleSave}>
          <i className="bi bi-save me-2"></i> Save & Create Exam
        </button>
      </div>
    </div>
  );
};

export default CreateExam;
