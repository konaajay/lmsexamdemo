import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const ExamDashboard = () => {
  const [exams, setExams] = useState([]);
  const [filter, setFilter] = useState("total");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("exams") || "[]");

    const demoCompletedExam = {
      id: "demo-1",
      title: "Introduction to React",
      course: "Frontend Masterclass",
      type: "quiz",
      dateCreated: "2024-11-15T10:00:00Z",
      status: "completed"
    };

    setExams(
      [...saved, demoCompletedExam].sort(
        (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
      )
    );
  }, []);

  const stats = useMemo(() => {
    const total = exams.length;
    const completed = exams.filter(e => e.status === "completed").length;
    const scheduled = total - completed;
    return { total, scheduled, completed };
  }, [exams]);

  const filteredExams = exams.filter(exam => {
    const status = exam.status || "upcoming";

    const matchesFilter =
      filter === "total" ||
      (filter === "completed" && status === "completed") ||
      (filter === "upcoming" && status !== "completed");

    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.course.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (

    <div className="container-fluid min-vh-100" style={{ backgroundColor: "#f8f9fa", fontFamily: "'Inter', sans-serif", paddingTop: "80px" }}>
      <div className="container">

        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 gap-3">
          <div>
            <h2 className="fw-bold text-dark mb-1">Exam Dashboard</h2>
            <p className="text-secondary mb-0">Overview of exams and  performance.</p>
          </div>

          <div className="d-flex gap-3">
            <Link to="/exam/question-bank" className="btn btn-light shadow-sm text-secondary fw-semibold">
              <i className="bi bi-collection me-2"></i>Question Bank
            </Link>
            <Link to="/exam/create-exam" className="btn btn-primary shadow fw-bold px-4 hover-scale">
              <i className="bi bi-plus-lg me-2"></i>Create Exam
            </Link>
          </div>
        </div>

        {/* Stats Section with Hover Effects */}
        <div className="row g-4 mb-5">
          <StatCard
            label="Total Exams"
            value={stats.total}
            icon="bi-files"
            color="primary"
          />
          <StatCard
            label="Scheduled"
            value={stats.scheduled}
            icon="bi-calendar-check"
            color="warning"
          />
          <StatCard
            label="Completed"
            value={stats.completed}
            icon="bi-check-circle"
            color="success"
          />
        </div>

        {/* Main Content Card */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
          <div className="card-body p-4">

            {/* Filters & Search Toolbar */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-4">

              <div className="bg-light p-1 rounded-pill d-inline-flex flex-wrap justify-content-center">
                <FilterButton active={filter === "total"} onClick={() => setFilter("total")}>
                  All Exams
                </FilterButton>
                <FilterButton active={filter === "upcoming"} onClick={() => setFilter("upcoming")}>
                  Upcoming
                </FilterButton>
                <FilterButton active={filter === "completed"} onClick={() => setFilter("completed")}>
                  Completed
                </FilterButton>
              </div>

              <div className="position-relative w-100" style={{ maxWidth: "300px" }}>
                <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                <input
                  type="text"
                  className="form-control rounded-pill ps-5 bg-light border-0"
                  placeholder="Search exams..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Polished Table */}
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr className="text-secondary small text-uppercase fw-bold ls-1">
                    <th className="ps-4 py-3 border-0 rounded-start">Exam Name</th>
                    <th className="py-3 border-0">Course</th>
                    <th className="py-3 border-0">Type</th>
                    <th className="py-3 border-0">Date</th>
                    <th className="py-3 border-0">Status</th>
                    <th className="pe-4 py-3 border-0 text-end rounded-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExams.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-5">
                        <div className="mb-3 text-muted opacity-25" style={{ fontSize: "2.5rem" }}><i className="bi bi-inbox"></i></div>
                        <p className="text-muted fw-medium">No exams found matching your criteria.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredExams.map(exam => {
                      const completed = exam.status === "completed";
                      return (
                        <tr key={exam.id} style={{ transition: "background-color 0.2s" }}>
                          <td className="ps-4 py-3">
                            <span className="fw-bold text-dark d-block">{exam.title}</span>
                          </td>
                          <td className="text-muted fw-medium">{exam.course}</td>
                          <td>
                            <span className={`badge rounded-pill border px-2 py-1 fw-normal ${exam.type === 'quiz' ? 'bg-primary-subtle text-primary border-primary-subtle' : 'bg-secondary-subtle text-secondary border-secondary-subtle'}`}>
                              {formatType(exam.type)}
                            </span>
                          </td>
                          <td className="text-muted small">
                            <i className="bi bi-clock me-1 text-secondary opacity-50"></i>
                            {new Date(exam.dateCreated).toLocaleDateString()}
                          </td>
                          <td>
                            {completed ? (
                              <span className="badge rounded-pill bg-success-subtle text-success border border-success-subtle px-2">
                                <i className="bi bi-check-circle-fill me-1"></i>Completed
                              </span>
                            ) : (
                              <span className="badge rounded-pill bg-warning-subtle text-warning-emphasis border border-warning-subtle px-2">
                                <i className="bi bi-hourglass-split me-1"></i>Upcoming
                              </span>
                            )}
                          </td>
                          <td className="text-end pe-4">
                            <div className="d-flex justify-content-end gap-2">
                              <Link
                                to={`/exam/view-paper/${exam.id}`}
                                className="btn btn-sm btn-light text-primary fw-medium hover-primary"
                                title="Preview Exam"
                              >
                                Preview
                              </Link>

                              {!completed && (
                                <Link
                                  to={`/exam/edit-exam/${exam.id}`}
                                  className="btn btn-sm btn-light text-secondary fw-medium hover-dark"
                                  title="Edit Exam"
                                >
                                  Edit
                                </Link>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Simple Footer */}
            {filteredExams.length > 0 && (
              <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top text-muted small">
                <span>Showing {filteredExams.length} results</span>
                <span>Page 1 of 1</span>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Global Dashboard Styles */}
      <style>
        {`
           .hover-lift {
              transition: transform 0.2s ease, box-shadow 0.2s ease;
           }
           .hover-lift:hover {
              transform: translateY(-5px);
              box-shadow: 0 10px 20px rgba(0,0,0,0.08) !important;
           }
           .hover-scale:hover {
              transform: scale(1.02);
           }
           .bg-primary-subtle { background-color: rgba(13, 110, 253, 0.1) !important; }
           .bg-success-subtle { background-color: rgba(25, 135, 84, 0.1) !important; }
           .bg-warning-subtle { background-color: rgba(255, 193, 7, 0.1) !important; }
           .bg-secondary-subtle { background-color: rgba(108, 117, 125, 0.1) !important; }
        `}
      </style>
    </div>
  );
};

/* ---------- Enhanced Helpers ---------- */

const StatCard = ({ label, value, icon, color }) => (
  <div className="col-md-4">
    <div className={`card border-0 shadow-sm h-100 p-3 rounded-4 hover-lift position-relative overflow-hidden`}>
      <div className={`position-absolute top-0 end-0 p-3 opacity-10 text-${color}`}>
        <i className={`bi ${icon}`} style={{ fontSize: "3rem" }}></i>
      </div>
      <div className="d-flex flex-column justify-content-center h-100 position-relative">
        <h6 className="text-secondary text-uppercase small fw-bold mb-2 ls-1">{label}</h6>
        <h2 className={`display-6 fw-bold text-dark mb-0`}>{value}</h2>
      </div>
      <div className={`mt-3 h-1 w-100 rounded bg-${color} opacity-25`} style={{ height: "4px" }}></div>
    </div>
  </div>
);

const FilterButton = ({ active, children, onClick }) => (
  <button
    className={`btn btn-sm rounded-pill px-3 m-1 fw-semibold transition-all ${active ? "bg-white shadow-sm text-dark" : "text-muted hover-dark"}`}
    onClick={onClick}
    style={{ border: "none" }}
  >
    {children}
  </button>
);

const formatType = type => {
  if (!type) return "-";
  if (type === "quiz") return "Multiple Choice";
  return type.toUpperCase();
};

export default ExamDashboard;
