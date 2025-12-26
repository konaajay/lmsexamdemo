import { useState } from "react";
import { Link } from "react-router-dom";

const StudentExamSelection = () => {
    const [courseFilter, setCourseFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");

    const exams = [
        { id: 1, title: "Mid-Term Java", course: "Java", type: "Quiz", duration: "60 min", questions: 30 },
        { id: 2, title: "React Fundamentals", course: "Web", type: "Short Answer", duration: "45 min", questions: 15 },
        { id: 3, title: "Data Structures Final", course: "CS101", type: "Mixed", duration: "120 min", questions: 50 },
        { id: 4, title: "Spring Boot Security", course: "Backend", type: "Quiz", duration: "30 min", questions: 20 },
        { id: 5, title: "Advanced CSS", course: "Web", type: "Quiz", duration: "45 min", questions: 25 },
    ];

    const filteredExams = exams.filter((exam) => {
        const matchesCourse = courseFilter === "all" || exam.course === courseFilter;
        const matchesType = typeFilter === "all" || exam.type === typeFilter;
        return matchesCourse && matchesType;
    });

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h1 className="fw-bold text-dark mb-2">Student Exam Portal</h1>
                    <p className="text-muted">Select an exam to begin your assessment.</p>
                </div>
                <Link to="/exam/dashboard" className="btn btn-outline-secondary">
                    Back to Admin (Demo)
                </Link>
            </div>

            {/* Filters */}
            <div className="card shadow-sm border-0 mb-5">
                <div className="card-body bg-light rounded-3 p-4">
                    <div className="row g-3">
                        <div className="col-md-5">
                            <label className="form-label fw-bold">Filter by Course</label>
                            <select
                                className="form-select"
                                value={courseFilter}
                                onChange={(e) => setCourseFilter(e.target.value)}
                            >
                                <option value="all">All Courses</option>
                                <option value="Java">Java</option>
                                <option value="Web">Web Development</option>
                                <option value="CS101">CS101</option>
                                <option value="Backend">Backend</option>
                            </select>
                        </div>
                        <div className="col-md-5">
                            <label className="form-label fw-bold">Filter by Exam Type</label>
                            <select
                                className="form-select"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                            >
                                <option value="all">All Types</option>
                                <option value="Quiz">Quiz</option>
                                <option value="Short Answer">Short Answer</option>
                                <option value="Mixed">Mixed</option>
                            </select>
                        </div>
                        <div className="col-md-2 d-flex align-items-end">
                            <button
                                className="btn btn-secondary w-100"
                                onClick={() => { setCourseFilter("all"); setTypeFilter("all"); }}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Exam Grid */}
            <div className="row g-4">
                {filteredExams.length > 0 ? (
                    filteredExams.map((exam) => (
                        <div key={exam.id} className="col-md-6 col-lg-4">
                            <div className="card h-100 shadow-sm border-0 transition-hover">
                                <div className="card-body p-4 d-flex flex-column">
                                    <div className="d-flex justify-content-between mb-3">
                                        <span className="badge bg-light text-primary border border-primary rounded-pill px-3">{exam.course}</span>
                                        <span className="badge bg-secondary rounded-pill px-3">{exam.type}</span>
                                    </div>
                                    <h4 className="card-title fw-bold mb-3">{exam.title}</h4>
                                    <div className="mb-4 text-muted small">
                                        <div className="d-flex align-items-center mb-2">
                                            <i className="bi bi-clock me-2"></i> {exam.duration}
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <i className="bi bi-question-circle me-2"></i> {exam.questions} Questions
                                        </div>
                                    </div>
                                    <div className="mt-auto">
                                        <button className="btn btn-primary w-100 fw-bold py-2 shadow-sm">
                                            Start Exam
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center py-5">
                        <h4 className="text-muted">No exams found matching your criteria.</h4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentExamSelection;
