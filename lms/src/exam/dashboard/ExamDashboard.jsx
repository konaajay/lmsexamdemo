import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ExamDashboard = () => {
  const [exams, setExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedExams = JSON.parse(localStorage.getItem("exams") || "[]");
    // Sort by date created desc
    setExams(savedExams.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)));
  }, []);

  const [filter, setFilter] = useState("total");

  // Filter exams based on search and active tab
  const filteredExams = exams.filter(e => {
    // Simulate status for local exams (defaulting to 'draft' which we treat as upcoming by default for now)
    // In a real app, 'status' would be part of the exam object.
    // For this demo: assume all created exams are 'upcoming' (draft) unless logic says otherwise.
    const status = e.status || 'upcoming';

    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.course.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesFilter = true;
    if (filter === 'upcoming') matchesFilter = status === 'upcoming' || status === 'scheduled' || status === 'draft';
    if (filter === 'completed') matchesFilter = status === 'completed';

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container-fluid min-vh-100 py-4" style={{
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      fontFamily: "'Inter', sans-serif"
    }}>
      <div className="container">

        {/* Header Section */}
        <div className="d-flex justify-content-end align-items-center mb-5">
          <div className="d-flex gap-3">
            <Link to="/exam/reattempt" className="btn btn-white shadow-sm fw-bold text-secondary">
              <i className="bi bi-gear me-2"></i>Settings
            </Link>
            <Link to="/exam/create-exam" className="btn btn-primary shadow fw-bold px-4">
              <i className="bi bi-plus-lg me-2"></i>Create New Exam
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "15px", background: "rgba(255,255,255,0.8)" }}>
              <div className="card-body p-4 d-flex align-items-center">
                <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3 text-primary">
                  <i className="bi bi-journal-text fs-4"></i>
                </div>
                <div>
                  <h6 className="text-muted text-uppercase small fw-bold mb-1 ls-1">Total Exams</h6>
                  <h3 className="mb-0 fw-bold text-dark">{exams.length + 24}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "15px", background: "rgba(255,255,255,0.8)" }}>
              <div className="card-body p-4 d-flex align-items-center">
                <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3 text-warning">
                  <i className="bi bi-clock-history fs-4"></i>
                </div>
                <div>
                  <h6 className="text-muted text-uppercase small fw-bold mb-1 ls-1">Scheduled</h6>
                  <h3 className="mb-0 fw-bold text-dark">5</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "15px", background: "rgba(255,255,255,0.8)" }}>
              <div className="card-body p-4 d-flex align-items-center">
                <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3 text-success">
                  <i className="bi bi-check-circle fs-4"></i>
                </div>
                <div>
                  <h6 className="text-muted text-uppercase small fw-bold mb-1 ls-1">Completed</h6>
                  <h3 className="mb-0 fw-bold text-dark">156</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exams Table Section */}
        <div className="card border-0 shadow-lg overflow-hidden" style={{
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.3)"
        }}>
          <div className="card-header bg-transparent border-0 pt-4 pb-2 px-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">

              {/* Filter Buttons */}
              <div className="bg-light p-1 rounded-pill d-flex flex-wrap justify-content-center">
                <button
                  className={`btn btn-sm rounded-pill px-3 fw-bold ${filter === 'total' ? 'btn-white shadow-sm text-primary' : 'text-muted border-0'}`}
                  onClick={() => setFilter('total')}
                  style={filter === 'total' ? { background: 'white' } : {}}
                >
                  Total
                </button>
                <button
                  className={`btn btn-sm rounded-pill px-3 fw-bold ${filter === 'upcoming' ? 'btn-white shadow-sm text-primary' : 'text-muted border-0'}`}
                  onClick={() => setFilter('upcoming')}
                  style={filter === 'upcoming' ? { background: 'white' } : {}}
                >
                  Upcoming
                </button>
                <button
                  className={`btn btn-sm rounded-pill px-3 fw-bold ${filter === 'completed' ? 'btn-white shadow-sm text-primary' : 'text-muted border-0'}`}
                  onClick={() => setFilter('completed')}
                  style={filter === 'completed' ? { background: 'white' } : {}}
                >
                  Completed
                </button>
              </div>

              {/* Search Bar */}
              <div className="input-group" style={{ maxWidth: "300px", minWidth: "250px" }}>
                <span className="input-group-text bg-white border-end-0 border rounded-start-pill ps-3">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 border rounded-end-pill"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

            </div>
          </div>

          <div className="card-body px-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0" style={{ minWidth: "800px" }}>
                <thead className="bg-light bg-opacity-50">
                  <tr className="text-uppercase text-secondary small fw-bold ls-1 border-bottom-0">
                    <th className="ps-4 py-3 border-0">Exam Name</th>
                    <th className="py-3 border-0">Course</th>
                    <th className="py-3 border-0">Type</th>
                    <th className="py-3 border-0">Date Created</th>
                    <th className="py-3 border-0">Status</th>
                    <th className="pe-4 py-3 border-0 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* LocalStorage Data */}
                  {filteredExams.map((exam) => (
                    <tr key={exam.id} style={{ transition: "all 0.2s" }}>
                      <td className="ps-4 fw-bold text-dark">{exam.title}</td>
                      <td className="text-muted">{exam.course}</td>
                      <td>
                        <span className={`badge rounded-pill fw-normal px-3 py-2 ${exam.type === 'quiz' ? 'bg-primary bg-opacity-10 text-primary' :
                          exam.type === 'mixed' ? 'bg-info bg-opacity-10 text-info' :
                            'bg-secondary bg-opacity-10 text-secondary'
                          }`}>
                          {exam.type === 'quiz' ? 'Multiple Choice' : exam.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="text-muted small">{new Date(exam.dateCreated).toLocaleDateString()}</td>
                      <td>
                        <span className="badge rounded-pill bg-warning bg-opacity-10 text-dark fw-bold px-2 border border-warning border-opacity-25">
                          <i className="bi bi-circle-fill text-warning me-1 small" style={{ fontSize: "0.5rem" }}></i>
                          Draft
                        </span>
                      </td>
                      <td className="pe-4 text-end">
                        <Link to={`/exam/view-paper/${exam.id}`} className="btn btn-sm btn-light border fw-bold text-primary shadow-sm hover-lift">
                          <i className="bi bi-eye me-1"></i> Preview
                        </Link>
                      </td>
                    </tr>
                  ))}

                  {/* Empty State if no results */}
                  {filteredExams.length === 0 && exams.length > 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-5">
                        <p className="text-muted mb-0">No exams found matching "{searchTerm}"</p>
                      </td>
                    </tr>
                  )}

                  {/* Demo/Mock Data (only if no real data) */}
                  {exams.length === 0 && (
                    <>
                      <tr>
                        <td className="ps-4 fw-bold text-dark">Mid-Term Java</td>
                        <td className="text-muted">Java Programming</td>
                        <td><span className="badge rounded-pill bg-primary bg-opacity-10 text-primary px-3 py-2">Multiple Choice</span></td>
                        <td className="text-muted small">2024-10-24</td>
                        <td>
                          <span className="badge rounded-pill bg-success bg-opacity-10 text-success fw-bold px-2 border border-success border-opacity-25">
                            <i className="bi bi-circle-fill text-success me-1 small" style={{ fontSize: "0.5rem" }}></i>
                            Completed
                          </span>
                        </td>
                        <td className="pe-4 text-end">
                          <button className="btn btn-sm btn-light border fw-bold text-secondary shadow-sm">Results</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="ps-4 fw-bold text-dark">React Fundamentals</td>
                        <td className="text-muted">Web Development</td>
                        <td><span className="badge rounded-pill bg-info bg-opacity-10 text-info px-3 py-2">Short Answer</span></td>
                        <td className="text-muted small">2025-10-28</td>
                        <td>
                          <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary fw-bold px-2 border border-primary border-opacity-25">
                            <i className="bi bi-circle-fill text-primary me-1 small" style={{ fontSize: "0.5rem" }}></i>
                            Scheduled
                          </span>
                        </td>
                        <td className="pe-4 text-end">
                          <button className="btn btn-sm btn-light border fw-bold text-secondary shadow-sm">Edit</button>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card-footer bg-transparent border-0 py-3 text-center text-muted small">
            Showing {filteredExams.length > 0 ? filteredExams.length : (exams.length === 0 ? 2 : 0)} entries
          </div>
        </div>
      </div>

      <style>
        {`
           .hover-lift:hover {
              transform: translateY(-2px);
              transition: transform 0.2s ease-in-out;
           }
        `}
      </style>
    </div>
  );
};

export default ExamDashboard;
