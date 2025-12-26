import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuestionBank = () => {
  const [type, setType] = useState("all");
  const [questions, setQuestions] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // Load questions flattened from exams
  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = () => {
    const exams = JSON.parse(localStorage.getItem("exams")) || [];
    // We need to keep reference to which exam and index the question belongs to for updating
    const allQuestions = [];
    exams.forEach((exam, examIdx) => {
      if (exam.questions) {
        exam.questions.forEach((q, qIdx) => {
          allQuestions.push({
            ...q,
            examId: exam.id,
            examIndex: examIdx,
            questionIndex: qIdx,
            examTitle: exam.title
          });
        });
      }
    });
    setQuestions(allQuestions);
  };

  const handleEditClick = (index, currentText) => {
    setEditingIndex(index);
    setEditText(currentText);
  };

  const handleSaveEdit = (qData) => {
    const exams = JSON.parse(localStorage.getItem("exams")) || [];
    const targetExam = exams[qData.examIndex];

    // Safety check
    if (targetExam && targetExam.questions[qData.questionIndex]) {
      targetExam.questions[qData.questionIndex].question = editText;

      // Save back
      exams[qData.examIndex] = targetExam;
      localStorage.setItem("exams", JSON.stringify(exams));

      toast.success("Question updated successfully!");
      setEditingIndex(null);
      loadQuestions(); // Reload to refresh view
    } else {
      toast.error("Error updating question.");
    }
  };

  const filtered = type === 'all'
    ? questions
    : questions.filter((q) => q.type === type);

  return (
    <div className="container-fluid min-vh-100 py-4" style={{
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      fontFamily: "'Inter', sans-serif"
    }}>
      <ToastContainer />
      <div className="container">

        {/* Header */}
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center mb-5 gap-3">
          <div className="text-center text-lg-start">
            <h2 className="fw-bold mb-1" style={{ color: "#2d3748" }}>Question Bank</h2>
            <p className="text-muted mb-0">Manage and modify questions from all your created exams.</p>
          </div>

          <div className="bg-white p-1 rounded-pill shadow-sm border d-flex flex-wrap justify-content-center">
            <button
              className={`btn btn-sm rounded-pill px-3 fw-bold ${type === 'all' ? 'bg-primary text-white shadow-sm' : 'text-muted'}`}
              onClick={() => setType('all')}
            >
              All
            </button>
            <button
              className={`btn btn-sm rounded-pill px-3 fw-bold ${type === 'quiz' ? 'bg-primary text-white shadow-sm' : 'text-muted'}`}
              onClick={() => setType('quiz')}
            >
              Quiz
            </button>
            <button
              className={`btn btn-sm rounded-pill px-3 fw-bold ${type === 'short' ? 'bg-primary text-white shadow-sm' : 'text-muted'}`}
              onClick={() => setType('short')}
            >
              Short
            </button>
            <button
              className={`btn btn-sm rounded-pill px-3 fw-bold ${type === 'long' ? 'bg-primary text-white shadow-sm' : 'text-muted'}`}
              onClick={() => setType('long')}
            >
              Long
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="card border-0 shadow-lg rounded-4 p-5 text-center" style={{ background: "rgba(255,255,255,0.6)" }}>
            <div className="mb-3 text-secondary opacity-25" style={{ fontSize: "4rem" }}><i className="bi bi-stack"></i></div>
            <h4 className="text-muted fw-bold">No questions found.</h4>
            <p className="text-muted">Create exams to populate your question bank.</p>
          </div>
        ) : (
          <div className="row g-4">
            {filtered.map((q, i) => (
              <div key={i} className="col-12">
                <div className="card border-0 shadow-sm border-start border-4 border-primary hover-lift transition-all" style={{ borderRadius: "10px" }}>
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className={`badge rounded-pill px-3 py-2 ${q.type === 'quiz' ? 'bg-primary bg-opacity-10 text-primary' :
                        q.type === 'short' ? 'bg-info bg-opacity-10 text-info' :
                          'bg-warning bg-opacity-10 text-dark'
                        }`}>
                        {q.type.toUpperCase()}
                      </span>
                      <small className="text-muted fw-bold text-uppercase ls-1" style={{ fontSize: "0.7rem" }}>
                        From: {q.examTitle}
                      </small>
                    </div>

                    {editingIndex === i ? (
                      <div className="mt-3">
                        <textarea
                          className="form-control mb-2"
                          rows="2"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                        />
                        <div className="d-flex gap-2">
                          <button onClick={() => handleSaveEdit(q)} className="btn btn-sm btn-success fw-bold">
                            <i className="bi bi-check-lg me-1"></i> Save
                          </button>
                          <button onClick={() => setEditingIndex(null)} className="btn btn-sm btn-light border">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <h5 className="fw-bold text-dark mb-0 me-3 flex-grow-1">
                          {q.question}
                        </h5>
                        <button
                          className="btn btn-light btn-sm rounded-circle shadow-sm text-primary"
                          onClick={() => handleEditClick(i, q.question)}
                          title="Edit Question"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                      </div>
                    )}

                    {q.image && !editingIndex && (
                      <div className="mt-3">
                        <img src={q.image} alt="Reference" className="img-thumbnail" style={{ height: "80px" }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
      <style>
        {`
           .hover-lift:hover {
              transform: translateY(-3px);
              box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
           }
           .transition-all {
              transition: all 0.3s ease;
           }
        `}
      </style>
    </div>
  );
};

export default QuestionBank;
