import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReattemptRules = () => {
  const [settings, setSettings] = useState({
    maxAttempts: "1",
    gradingStrategy: "highest",
    cooldownPeriod: "0",
    allowReattemptCondition: "always",
    reattemptFee: "0",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSave = () => {
    // Simulate API call
    toast.success("Reattempt policies updated successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="container-fluid py-4">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold text-dark mb-1">Reattempt & Policy Settings</h2>
              <p className="text-muted">Configure global rules for exam retakes and scoring logic.</p>
            </div>
            <button className="btn btn-primary px-4 fw-bold shadow-sm" onClick={handleSave}>
              <i className="bi bi-save me-2"></i> Save Changes
            </button>
          </div>

          <div className="row g-4">
            {/* General Attempts Card */}
            <div className="col-md-6">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-header bg-white border-bottom-0 pt-4 px-4">
                  <h5 className="fw-bold text-primary mb-0">
                    <i className="bi bi-arrow-repeat me-2"></i>Attempt Limits
                  </h5>
                </div>
                <div className="card-body px-4 pb-4">
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-uppercase text-muted">Maximum Attempts Allowed</label>
                    <select
                      className="form-select border-light bg-light text-dark"
                      name="maxAttempts"
                      value={settings.maxAttempts}
                      onChange={handleChange}
                    >
                      <option value="1">No Reattempts (1 Attempt Total)</option>
                      <option value="2">2 Attempts</option>
                      <option value="3">3 Attempts</option>
                      <option value="5">5 Attempts</option>
                      <option value="unlimited">Unlimited Attempts</option>
                    </select>
                    <div className="form-text">Default limit for new exams unless overridden.</div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold small text-uppercase text-muted">Grading Strategy</label>
                    <select
                      className="form-select border-light bg-light text-dark"
                      name="gradingStrategy"
                      value={settings.gradingStrategy}
                      onChange={handleChange}
                    >
                      <option value="highest">Highest Score (Best of all attempts)</option>
                      <option value="latest">Latest Score (Most recent attempt)</option>
                      <option value="average">Average Score (All attempts)</option>
                    </select>
                    <div className="form-text">Determines which score appears on the final transcript.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Restrictions & Timing Card */}
            <div className="col-md-6">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-header bg-white border-bottom-0 pt-4 px-4">
                  <h5 className="fw-bold text-danger mb-0">
                    <i className="bi bi-hourglass-split me-2"></i>Scaling & Restrictions
                  </h5>
                </div>
                <div className="card-body px-4 pb-4">
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-uppercase text-muted">Cooldown Period</label>
                    <select
                      className="form-select border-light bg-light text-dark"
                      name="cooldownPeriod"
                      value={settings.cooldownPeriod}
                      onChange={handleChange}
                    >
                      <option value="0">None (Immediate Reattempt)</option>
                      <option value="30">30 Minutes</option>
                      <option value="60">1 Hour</option>
                      <option value="1440">24 Hours</option>
                      <option value="10080">7 Days</option>
                    </select>
                    <div className="form-text">Waiting time required between consecutive attempts.</div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold small text-uppercase text-muted">Eligibility Condition</label>
                    <select
                      className="form-select border-light bg-light text-dark"
                      name="allowReattemptCondition"
                      value={settings.allowReattemptCondition}
                      onChange={handleChange}
                    >
                      <option value="always">Always Allow (If attempts remain)</option>
                      <option value="failed_only">Only if Previous Attempt Failed</option>
                      <option value="below_70">Only if Score &lt; 70%</option>
                    </select>
                    <div className="form-text">Prerequisites for unlocking a reattempt.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Settings (Full Width) */}
            <div className="col-12">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <div>
                    <h6 className="fw-bold mb-1">Reset Question Pool?</h6>
                    <p className="text-muted small mb-0">Should reattempts receive a new set of randomized questions?</p>
                  </div>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="randomizeQuestions" defaultChecked />
                    <label className="form-check-label" htmlFor="randomizeQuestions">Rankdomize Questions</label>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ReattemptRules;
