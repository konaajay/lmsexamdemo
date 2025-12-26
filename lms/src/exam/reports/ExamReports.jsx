const ExamReports = () => {
  return (
    <div className="container-fluid">
      <h2 className="text-primary fw-bold mb-4">Exam Performance Reports</h2>

      {/* Filters */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body bg-light">
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label fw-bold small">Select Exam</label>
              <select className="form-select form-select-sm">
                <option>All Exams</option>
                <option>Mid-Term Java</option>
                <option>React Fundamentals</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold small">Date Range</label>
              <input type="date" className="form-control form-control-sm" />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold small">Status</label>
              <select className="form-select form-select-sm">
                <option>All</option>
                <option>Passed</option>
                <option>Failed</option>
              </select>
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button className="btn btn-primary btn-sm w-100">Apply Filters</button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="p-3 border rounded-3 bg-white text-center shadow-sm">
            <h6 className="text-muted">Average Score</h6>
            <h2 className="text-primary">72%</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 border rounded-3 bg-white text-center shadow-sm">
            <h6 className="text-muted">Top Score</h6>
            <h2 className="text-success">98%</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 border rounded-3 bg-white text-center shadow-sm">
            <h6 className="text-muted">Pass Rate</h6>
            <h2 className="text-info">85%</h2>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white">
          <h5 className="mb-0 fw-bold">Detailed Student Results</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Student Name</th>
                <th>Exam Title</th>
                <th>Date Attempted</th>
                <th>Score</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ajay Sharma</td>
                <td>Mid-Term Java</td>
                <td>2024-10-25</td>
                <td>
                  <div className="d-flex align-items-center">
                    <span className="me-2 fw-bold">78%</span>
                    <div className="progress flex-grow-1" style={{ height: '6px', width: '80px' }}>
                      <div className="progress-bar bg-success" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </td>
                <td><span className="badge bg-success bg-opacity-10 text-success">Pass</span></td>
                <td><button className="btn btn-sm btn-link">View Details</button></td>
              </tr>
              <tr>
                <td>Rohan Das</td>
                <td>Mid-Term Java</td>
                <td>2024-10-25</td>
                <td>
                  <div className="d-flex align-items-center">
                    <span className="me-2 fw-bold">45%</span>
                    <div className="progress flex-grow-1" style={{ height: '6px', width: '80px' }}>
                      <div className="progress-bar bg-danger" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </td>
                <td><span className="badge bg-danger bg-opacity-10 text-danger">Fail</span></td>
                <td><button className="btn btn-sm btn-link">View Details</button></td>
              </tr>
              <tr>
                <td>Sarah Lee</td>
                <td>React Fundamentals</td>
                <td>2024-10-29</td>
                <td>
                  <div className="d-flex align-items-center">
                    <span className="me-2 fw-bold">92%</span>
                    <div className="progress flex-grow-1" style={{ height: '6px', width: '80px' }}>
                      <div className="progress-bar bg-success" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </td>
                <td><span className="badge bg-success bg-opacity-10 text-success">Pass</span></td>
                <td><button className="btn btn-sm btn-link">View Details</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExamReports;
