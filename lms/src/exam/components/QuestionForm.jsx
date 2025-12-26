import { useState } from "react";

const QuestionForm = ({ type, onAdd }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    if (!question.trim()) return;

    let payload = { type, question, image };

    if (type === "quiz") {
      payload.options = options;
      payload.correctOption = correctOption;
    }

    onAdd(payload);

    // reset form
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectOption("");
    setImage(null);
  };

  return (
    <div className="border rounded p-3 mb-3 bg-white">
      <h6 className="text-capitalize">{type} Question</h6>

      <div className="mb-2">
        <label className="form-label">Question Text</label>
        <input
          className="form-control"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter question text here..."
        />
      </div>

      <div className="mb-3">
        <label className="form-label d-flex justify-content-between">
          <span>Question Image <small className="text-muted fw-normal">(Optional - for Math/Diagrams)</small></span>
          {image && <button type="button" className="btn btn-link py-0 text-danger" onClick={() => setImage(null)}><small>Remove</small></button>}
        </label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={handleImageChange}
        />
        {image && (
          <div className="mt-2 text-center p-2 bg-light border rounded">
            <img src={image} alt="Question Preview" style={{ maxHeight: "150px", maxWidth: "100%" }} />
          </div>
        )}
      </div>

      {type === "quiz" && (
        <>
          {options.map((opt, i) => (
            <input
              key={i}
              className="form-control mb-2"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => {
                const copy = [...options];
                copy[i] = e.target.value;
                setOptions(copy);
              }}
            />
          ))}

          <select
            className="form-select mb-2"
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
          >
            <option value="">Correct Option</option>
            {options.map((_, i) => (
              <option key={i} value={i}>
                Option {i + 1}
              </option>
            ))}
          </select>
        </>
      )}

      {(type === "short" || type === "long") && (
        <textarea
          className="form-control"
          rows={type === "short" ? 3 : 6}
          disabled
          placeholder="Student will write answer here"
        />
      )}

      <button
        type="button"
        className="btn btn-outline-primary btn-sm mt-2"
        onClick={handleAdd}
      >
        <i className="bi bi-plus-circle me-1"></i>
        Add Question
      </button>
    </div>
  );
};

export default QuestionForm;
