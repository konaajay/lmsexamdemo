import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExamSchedule = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [scheduleData, setScheduleData] = useState({
    course: "",
    startTime: "",
    endTime: "",
    duration: "",
    emailNotify: false
  });

  useEffect(() => {
    const storedExams = JSON.parse(localStorage.getItem("exams")) || [];
    setExams(storedExams);
  }, []);

  const handleSchedule = (e) => {
    e.preventDefault();
    if (!selectedExam || !scheduleData.startTime) {
      toast.error("Please select an exam and start time.");
      return;
    }
    // Simulate scheduling logic
    toast.success("Exam scheduled successfully!", {
      position: "top-right",
      autoClose: 3000
    });
    // In a real app, we would save this schedule to a backend or another localStorage key
  };

  return (
    <div className="card shadow-sm border-0">
      <ToastContainer />
      <div className="card-header bg-white py-3">
        <h4 className="card-title mb-0 fw-bold">Schedule Exam</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSchedule}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Select Exam</label>
              <select
                className="form-select"
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
              >
                <option value="">Choose an exam...</option>
                {exams.map((exam) => (
                  <option key={exam.id} value={exam.id}>
                    {exam.title} ({exam.course})
                  </option>
                ))}
              </select>
              {exams.length === 0 && <small className="text-muted">No exams found. Create one first!</small>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Assign to Course/Group</label>
              <select
                className="form-select"
                value={scheduleData.course}
                onChange={(e) => setScheduleData({ ...scheduleData, course: e.target.value })}
              >
                <option value="">Select Course...</option>
                <option value="java">Java Programming</option>
                <option value="web">Web Development</option>
                <option value="cs101">CS 101</option>
                <option value="backend">Backend Engineering</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Start Date & Time</label>
              <input
                type="datetime-local"
                className="form-control"
                value={scheduleData.startTime}
                onChange={(e) => setScheduleData({ ...scheduleData, startTime: e.target.value })}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">End Date & Time</label>
              <input
                type="datetime-local"
                className="form-control"
                value={scheduleData.endTime}
                onChange={(e) => setScheduleData({ ...scheduleData, endTime: e.target.value })}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Duration (minutes)</label>
              <input
                type="number"
                className="form-control"
                placeholder="60"
                value={scheduleData.duration}
                onChange={(e) => setScheduleData({ ...scheduleData, duration: e.target.value })}
              />
            </div>

            <div className="col-12">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="emailNotify"
                  checked={scheduleData.emailNotify}
                  onChange={(e) => setScheduleData({ ...scheduleData, emailNotify: e.target.checked })}
                />
                <label className="form-check-label" htmlFor="emailNotify">
                  Send email notification to students
                </label>
              </div>
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-primary me-2">Schedule Exam</button>
              <button type="button" className="btn btn-light">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExamSchedule;
