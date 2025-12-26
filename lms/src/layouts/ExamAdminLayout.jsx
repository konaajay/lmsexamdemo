import { Link, Outlet } from "react-router-dom";

const ExamAdminLayout = () => {
  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        <aside className="col-md-2 bg-dark text-white p-3">
          <h5 className="mb-4">Exam Admin</h5>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link text-white" to="dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="create-exam">Create Exam</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="schedule">Schedule Exam</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="question-bank">Question Bank</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="reports">Reports</Link>
            </li>
            <li className="nav-item mt-4 pt-4 border-top border-secondary">
              <Link className="nav-link text-warning" to="/student-portal">
                <i className="bi bi-person-badge me-2"></i> Student View
              </Link>
            </li>
          </ul>
        </aside>

        <main className="col-md-10 p-4 bg-light">
          <Outlet />
        </main>
      </div>
    </div >
  );
};

export default ExamAdminLayout;
