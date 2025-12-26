import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ExamPaperView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [exam, setExam] = useState(null);

    useEffect(() => {
        const exams = JSON.parse(localStorage.getItem("exams")) || [];
        // Soft compare because id might be number or string
        const foundExam = exams.find(e => String(e.id) === String(id));
        setExam(foundExam);
    }, [id]);

    if (!exam) {
        return (
            <div className="container py-5 text-center">
                <h3 className="text-muted">Loading Exam Paper...</h3>
                <button className="btn btn-secondary mt-3" onClick={() => navigate('/exam/dashboard')}>
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="container py-5">

            {/* Paper Container - styled to look like A4 paper nicely */}
            <div className="bg-white shadow-lg p-5 mx-auto" style={{ maxWidth: '800px', minHeight: '1000px' }}>

                {/* Header */}
                <div className="text-center border-bottom pb-4 mb-4">
                    <h1 className="fw-bold text-uppercase mb-2">{exam.title}</h1>
                    <h4 className="text-secondary mb-3">{exam.course}</h4>

                    <div className="d-flex justify-content-between text-muted px-5 fw-bold">
                        <span>Duration: {exam.duration} Minutes</span>
                        <span>Total Marks: {exam.totalMarks}</span>
                    </div>
                </div>

                {/* Instructions (Optional boilerplate) */}
                <div className="mb-4">
                    <h6 className="fw-bold text-decoration-underline">Instructions:</h6>
                    <ul className="small text-muted">
                        <li>Answer all questions.</li>
                        <li>Read each question carefully before answering.</li>
                        <li>Use of unauthorized materials is prohibited.</li>
                    </ul>
                </div>

                {/* Questions Loop */}
                <div className="questions-section">
                    {exam.questions.map((q, index) => (
                        <div key={index} className="mb-5">
                            <div className="d-flex">
                                <span className="fw-bold me-2">Q{index + 1}.</span>
                                <div className="flex-grow-1">
                                    <p className="fw-bold mb-2 break-word">
                                        {q.question}
                                    </p>

                                    {/* Question Image */}
                                    {q.image && (
                                        <div className="mb-3">
                                            <img
                                                src={q.image}
                                                alt={`Figure for Q${index + 1}`}
                                                className="img-fluid border rounded"
                                                style={{ maxHeight: '200px' }}
                                            />
                                        </div>
                                    )}

                                    {/* Options for Quiz */}
                                    {q.type === 'quiz' && q.options && (
                                        <div className="ps-3">
                                            {q.options.map((opt, i) => (
                                                <div key={i} className="form-check mb-1">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name={`q${index}`}
                                                        id={`q${index}_opt${i}`}
                                                        disabled
                                                    />
                                                    <label className="form-check-label" htmlFor={`q${index}_opt${i}`}>
                                                        {opt}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Space for Written Answers */}
                                    {(q.type === 'short' || q.type === 'long') && (
                                        <div className="border rounded bg-light mt-2" style={{ height: q.type === 'short' ? '80px' : '150px' }}></div>
                                    )}
                                </div>
                                <div className="text-end ms-3">
                                    {/* Placeholder for marks per question if we had them */}
                                    <span className="badge bg-light text-dark border">
                                        {Math.round(exam.totalMarks / exam.questions.length)} Marks
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="text-center border-top pt-4 mt-5 text-muted small">
                    *** End of Question Paper ***
                </div>

            </div>

            {/* Action Buttons (Non-printable area) */}
            <div className="text-center mt-4 no-print">
                <button className="btn btn-primary me-2" onClick={() => window.print()}>
                    <i className="bi bi-printer me-2"></i> Print Paper
                </button>
                <button className="btn btn-outline-secondary" onClick={() => navigate('/exam/create-exam')}>
                    Create Another
                </button>
            </div>

            <style>
                {`
            @media print {
                .no-print { display: none !important; }
                body { background: white; }
                .shadow-lg { box-shadow: none !important; }
            }
        `}
            </style>
        </div>
    );
};

export default ExamPaperView;
