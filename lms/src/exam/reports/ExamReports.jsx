import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const ExamReports = () => {
  // Mock Data for Reports (Simulating fetched backend data)
  const [results] = useState([
    { id: 1, student: "Ajay Sharma", exam: "Mid-Term Java", date: "2024-10-25", score: 78, status: "Pass" },
    { id: 2, student: "Rohan Das", exam: "Mid-Term Java", date: "2024-10-25", score: 45, status: "Fail" },
    { id: 3, student: "Sarah Lee", exam: "React Fundamentals", date: "2024-10-29", score: 92, status: "Pass" },
    { id: 4, student: "Vikram Singh", exam: "Advanced CS", date: "2024-11-02", score: 88, status: "Pass" },
    { id: 5, student: "Priya Patel", exam: "React Fundamentals", date: "2024-11-05", score: 60, status: "Pass" },
    { id: 6, student: "Amit Kumar", exam: "Mid-Term Java", date: "2024-11-10", score: 30, status: "Fail" },
  ]);

  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [examFilter, setExamFilter] = useState("All");

  // Filter Logic
  const filteredResults = useMemo(() => {
    return results.filter(r => {
      // Exam Filter
      if (examFilter !== "All" && r.exam !== examFilter) return false;

      // Date Range Filter
      if (dateRange.start && new Date(r.date) < new Date(dateRange.start)) return false;
      if (dateRange.end && new Date(r.date) > new Date(dateRange.end)) return false;

      return true;
    });
  }, [results, examFilter, dateRange]);

  // Derived Stats
  const stats = useMemo(() => {
    const total = filteredResults.length;
    if (total === 0) return { avg: 0, top: 0, passRate: 0 };

    const totalScore = filteredResults.reduce((acc, curr) => acc + curr.score, 0);
    const topScore = Math.max(...filteredResults.map(r => r.score));
    const passedCount = filteredResults.filter(r => r.status === "Pass").length;

    return {
      avg: Math.round(totalScore / total),
      top: topScore,
      passRate: Math.round((passedCount / total) * 100)
    };
  }, [filteredResults]);

  // Unique exams for dropdown
  const uniqueExams = [...new Set(results.map(r => r.exam))];

  return (
    <div className="container-fluid min-vh-100 py-4" style={{
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      fontFamily: "'Inter', sans-serif"
    }}>
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2 className="fw-bold mb-1" style={{ color: "#2d3748" }}>Exam Reports</h2>
            <p className="text-muted mb-0">Deep dive into student performance and exam statistics.</p>
          </div>
          <button className="btn btn-white shadow-sm fw-bold text-primary" onClick={() => window.print()}>
            <i className="bi bi-printer me-2"></i> Print Report
          </button>
        </div>

        {/* Filters Card */}
        <div className="card border-0 shadow-sm mb-5" style={{ borderRadius: "15px", background: "rgba(255,255,255,0.9)" }}>
          <div className="card-body p-4">
            <h6 className="fw-bold text-muted text-uppercase small ls-1 mb-3">Filter Data</h6>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label text-muted small fw-bold">Select Exam</label>
                <select
                  className="form-select border-0 bg-light shadow-sm"
                  value={examFilter}
                  onChange={(e) => setExamFilter(e.target.value)}
                >
                  <option value="All">All Exams</option>
                  {uniqueExams.map(ex => <option key={ex} value={ex}>{ex}</option>)}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label text-muted small fw-bold">From Date</label>
                <input
                  type="date"
                  className="form-control border-0 bg-light shadow-sm"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label text-muted small fw-bold">To Date</label>
                <input
                  type="date"
                  className="form-control border-0 bg-light shadow-sm"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 overflow-hidden" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4 position-relative">
                <div className="position-absolute top-0 end-0 p-3 opacity-10">
                  <i className="bi bi-bar-chart-fill display-1 text-primary"></i>
                </div>
                <h6 className="text-muted text-uppercase small fw-bold ls-1 mb-2">Average Score</h6>
                <h2 className="display-4 fw-bold text-primary mb-0">{stats.avg}%</h2>
                <small className="text-muted">Across {filteredResults.length} records</small>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 overflow-hidden" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4 position-relative">
                <div className="position-absolute top-0 end-0 p-3 opacity-10">
                  <i className="bi bi-trophy-fill display-1 text-success"></i>
                </div>
                <h6 className="text-muted text-uppercase small fw-bold ls-1 mb-2">Top Score</h6>
                <h2 className="display-4 fw-bold text-success mb-0">{stats.top}%</h2>
                <small className="text-muted">Highest achieved</small>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 overflow-hidden" style={{ borderRadius: "15px" }}>
              <div className="card-body p-4 position-relative">
                <div className="position-absolute top-0 end-0 p-3 opacity-10">
                  <i className="bi bi-pie-chart-fill display-1 text-info"></i>
                </div>
                <h6 className="text-muted text-uppercase small fw-bold ls-1 mb-2">Pass Rate</h6>
                <h2 className="display-4 fw-bold text-info mb-0">{stats.passRate}%</h2>
                <small className="text-muted">Students passed</small>
              </div>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="card border-0 shadow-lg overflow-hidden" style={{
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.3)"
        }}>
          <div className="card-header bg-transparent border-0 pt-4 pb-2 px-4">
            <h5 className="fw-bold mb-0" style={{ color: "#2d3748" }}>Detailed Performance</h5>
          </div>
          <div className="card-body px-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light bg-opacity-50">
                  <tr className="text-uppercase text-secondary small fw-bold ls-1 border-bottom-0">
                    <th className="ps-4 py-3 border-0">Student Name</th>
                    <th className="py-3 border-0">Exam Title</th>
                    <th className="py-3 border-0">Date Attempted</th>
                    <th className="py-3 border-0">Score</th>
                    <th className="py-3 border-0">Status</th>
                    <th className="pe-4 py-3 border-0 text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.length === 0 ? (
                    <tr><td colSpan="6" className="text-center py-5 text-muted">No records found matching filters.</td></tr>
                  ) : (
                    filteredResults.map(r => (
                      <tr key={r.id}>
                        <td className="ps-4 fw-bold text-dark">{r.student}</td>
                        <td className="text-muted">{r.exam}</td>
                        <td className="text-muted small">{new Date(r.date).toLocaleDateString()}</td>
                        <td style={{ width: "20%" }}>
                          <div className="d-flex align-items-center">
                            <span className="fw-bold me-2" style={{ width: "40px" }}>{r.score}%</span>
                            <div className="progress flex-grow-1" style={{ height: "6px", borderRadius: "10px" }}>
                              <div
                                className={`progress-bar ${r.score >= 80 ? 'bg-success' : r.score >= 50 ? 'bg-info' : 'bg-danger'}`}
                                style={{ width: `${r.score}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`badge rounded-pill px-3 py-2 ${r.status === 'Pass' ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>
                            {r.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="pe-4 text-end">
                          <button className="btn btn-sm btn-light border shadow-sm text-secondary">
                            Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ExamReports;
