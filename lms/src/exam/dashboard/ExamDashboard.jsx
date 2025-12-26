import { Link } from "react-router-dom";

const ExamDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-primary fw-bold mb-0">Dashboard</h2>
          <p className="text-muted small mb-0">Overview of exam performance and schedules</p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/exam/reattempt" className="btn btn-outline-secondary">
            <i className="bi bi-gear me-2"></i>Settings & Policies
          </Link>
          <Link to="/exam/create-exam" className="btn btn-primary">
            <i className="bi bi-plus-lg me-2"></i>Create New Exam
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0 border-start border-4 border-primary">
            <div className="card-body">
              <h6 className="text-muted text-uppercase small fw-bold">Total Exams</h6>
              <h3 className="mb-0 text-dark">24</h3>
              <small className="text-success"><i className="bi bi-arrow-up"></i> 12% increase</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 border-start border-4 border-warning">
            <div className="card-body">
              <h6 className="text-muted text-uppercase small fw-bold">Scheduled</h6>
              <h3 className="mb-0 text-dark">5</h3>
              <small className="text-muted">Upcoming this week</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 border-start border-4 border-success">
            <div className="card-body">
              <h6 className="text-muted text-uppercase small fw-bold">Completed</h6>
              <h3 className="mb-0 text-dark">156</h3>
              <small className="text-success">Successful submissions</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 border-start border-4 border-info">
            <div className="card-body">
              <h6 className="text-muted text-uppercase small fw-bold">Avg. Score</h6>
              <h3 className="mb-0 text-dark">76%</h3>
              <small className="text-danger"><i className="bi bi-arrow-down"></i> 2% last month</small>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Exams Table */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0 fw-bold">Recent Exams</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Exam Name</th>
                <th>Course</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Dynamic Rows from LocalStorage */}
              {JSON.parse(localStorage.getItem("exams") || "[]").map((exam) => (
                <tr key={exam.id}>
                  <td className="fw-bold">{exam.title}</td>
                  <td>{exam.course}</td>
                  <td><span className="badge bg-primary text-capitalize">{exam.type}</span></td>
                  <td>{new Date(exam.dateCreated).toLocaleDateString()}</td>
                  <td><span className="badge bg-secondary">Draft</span></td>
                  <td>
                    <Link to={`/exam/view-paper/${exam.id}`} className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-eye me-1"></i> View Paper
                    </Link>
                  </td>
                </tr>
              ))}

              {/* Hardcoded Mocks (only show if no real data for demo) */}
              {(!localStorage.getItem("exams") || JSON.parse(localStorage.getItem("exams")).length === 0) && (
                <>
                  <tr>
                    <td className="fw-bold">Mid-Term Java</td>
                    <td>Java Programming</td>
                    <td><span className="badge bg-primary">Quiz</span></td>
                    <td>2024-10-24</td>
                    <td><span className="badge bg-success">Completed</span></td>
                    <td><button className="btn btn-sm btn-outline-secondary">Results</button></td>
                  </tr>
                  <tr>
                    <td className="fw-bold">React Fundamentals</td>
                    <td>Web Development</td>
                    <td><span className="badge bg-info text-dark">Short Answer</span></td>
                    <td>2024-10-28</td>
                    <td><span className="badge bg-warning text-dark">Scheduled</span></td>
                    <td><button className="btn btn-sm btn-outline-secondary">Edit</button></td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExamDashboard;
