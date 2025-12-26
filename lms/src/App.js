import { Routes, Route, Navigate } from "react-router-dom";
import ExamAdminLayout from "./layouts/ExamAdminLayout";
import ExamRoutes from "./exam/routes/exam.routes";
import StudentExamSelection from "./exam/student/StudentExamSelection";
import LoginPage from "./auth/LoginPage";
import SignupPage from "./auth/SignupPage";
import PublicLayout from "./layouts/PublicLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        <Route path="/exam" element={<ExamAdminLayout />}>
          {ExamRoutes}
        </Route>
        <Route path="/student-portal" element={<StudentExamSelection />} />
      </Routes>
    </>
  );
}

export default App;
