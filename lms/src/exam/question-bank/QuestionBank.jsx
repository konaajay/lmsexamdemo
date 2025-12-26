import { useEffect, useState } from "react";

const QuestionBank = () => {
  const [type, setType] = useState("quiz");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const exams = JSON.parse(localStorage.getItem("exams")) || [];

    const allQuestions = exams.flatMap((exam) => exam.questions);

    setQuestions(allQuestions);
  }, []);

  const filtered = questions.filter((q) => q.type === type);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">Question Bank</h2>
        <button className="btn btn-outline-primary">
          <i className="bi bi-upload me-2"></i>Import Questions
        </button>
      </div>

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body bg-light p-4 rounded">
          <label className="form-label fw-bold">Filter by Question Type</label>
          <select
            className="form-select w-auto"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="quiz">Quiz (Multiple Choice)</option>
            <option value="short">Short Answer</option>
            <option value="long">Long Essay</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-5 bg-white rounded shadow-sm">
          <div className="mb-3 text-muted" style={{ fontSize: "3rem" }}><i className="bi bi-inbox"></i></div>
          <h5 className="text-muted fw-bold">No questions found for this category.</h5>
          <p className="text-secondary">Try selecting a different type or add new questions.</p>
        </div>
      ) : (
        <div className="list-group shadow-sm">
          {filtered.map((q, i) => (
            <div key={i} className="list-group-item p-3 border-start border-4 border-primary mb-2 rounded border-0 shadow-sm">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="badge bg-primary mb-2 text-uppercase">{q.type}</span>
                  <h6 className="mb-0 fw-bold">
                    {q.question}
                    {q.image && <i className="bi bi-image ms-2 text-primary" title="Has Image"></i>}
                  </h6>
                  {q.image && (
                    <div className="mt-2">
                      <img src={q.image} alt="Visual Question" className="img-fluid rounded border" style={{ maxHeight: '100px' }} />
                    </div>
                  )}
                </div>
                <button className="btn btn-sm btn-light text-muted"><i className="bi bi-three-dots-vertical"></i></button>
              </div>
            </div>
          ))}
        </div>
      )
      }
    </div >
  );
};

export default QuestionBank;
