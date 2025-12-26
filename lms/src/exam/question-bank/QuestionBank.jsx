import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuestionBank = () => {
  const [type, setType] = useState("all");
  const [questions, setQuestions] = useState([]);

  // Load Exams
  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = () => {
    const savedExams = JSON.parse(localStorage.getItem("exams")) || [];
    setQuestions(savedExams);
  };

  // Filter exams based on type
  const filtered = type === 'all'
    ? questions
    : questions.filter(exam => exam.type === type);

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
            <p className="text-muted mb-0">Questions from all your created exams.</p>
          </div>

          <div className="bg-white p-1 rounded-pill shadow-sm border d-flex flex-wrap justify-content-center">
            <button
              className={`btn btn-sm rounded-pill px-3 fw-bold ${type === 'all' ? 'bg-primary text-white shadow-sm' : 'text-muted'}`}
              onClick={() => setType('all')}
            >
              All
            </button>
            <button
              className={`btn btn-sm rounded-pill px-3 fw-bold ${type === 'mixed' ? 'bg-primary text-white shadow-sm' : 'text-muted'}`}
              onClick={() => setType('mixed')}
            >
              Mixed
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

        <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr className="text-secondary small text-uppercase fw-bold ls-1">
                  <th className="ps-4 py-3" style={{ width: "30%" }}>Exam Name</th>
                  <th className="py-3" style={{ width: "25%" }}>Course</th>
                  <th className="py-3" style={{ width: "20%" }}>Type</th>
                  <th className="py-3 text-end pe-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-5 text-muted">
                      <div className="mb-2 opacity-25" style={{ fontSize: "2rem" }}><i className="bi bi-folder-x"></i></div>
                      No exams found matching your filter.
                    </td>
                  </tr>
                ) : filtered.map((exam, i) => (
                  <tr key={i} className="border-bottom-light">
                    <td className="ps-4">
                      <span className="fw-bold text-dark">{exam.title}</span>
                    </td>
                    <td className="text-muted">
                      {exam.course}
                    </td>
                    <td>
                      <span className={`badge rounded-pill fw-normal px-2 ${exam.type === 'quiz' ? 'bg-primary bg-opacity-10 text-primary' :
                        exam.type === 'short' ? 'bg-info bg-opacity-10 text-info' :
                          exam.type === 'mixed' ? 'bg-success bg-opacity-10 text-success' :
                            'bg-warning bg-opacity-10 text-dark/50'
                        }`}>
                        {exam.type === 'quiz' ? 'Multiple Choice' : exam.type ? exam.type.toUpperCase() : 'UNKNOWN'}
                      </span>
                    </td>
                    <td className="text-end pe-4">
                      <Link
                        to={`/exam/view-paper/${exam.id}`}
                        className="btn btn-sm btn-light border fw-bold text-primary shadow-sm hover-lift"
                      >
                        <i className="bi bi-eye me-1"></i> Preview
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer (Static for visual match) */}
          <div className="d-flex justify-content-between align-items-center p-3 border-top bg-light bg-opacity-10">
            <span className="text-muted small">Page 1 of 1</span>
            <div className="d-flex align-items-center gap-2">
              <span className="text-muted small me-2">Items per page:</span>
              <select className="form-select form-select-sm" style={{ width: "70px" }} defaultValue="10">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
          </div>
        </div>

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
