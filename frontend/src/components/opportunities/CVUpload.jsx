import { useRef, useState } from "react";
import {
  FaCloudUploadAlt,
  FaCheckCircle,
} from "react-icons/fa";

function CVUpload({ formData, setFormData }) {
  const fileInputRef = useRef(null);

  const [dragActive, setDragActive] = useState(false);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFile = (file) => {
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, DOC and DOCX files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Maximum file size is 5 MB.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      cv: file,
    }));
  };

  const handleFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files[0];

    handleFile(file);
  };

  return (
    <section className="form-card">

      <div className="form-section-header">

        <span className="section-number">
          06
        </span>

        <div className="section-icon">
          <FaCloudUploadAlt />
        </div>

        <div>
          <h2>Curriculum Vitae (CV)</h2>

          <p>
            Upload your most recent CV in PDF, DOC or DOCX format.
          </p>
        </div>

      </div>

      <div
        className={`cv-upload-box ${dragActive ? "drag-active" : ""}`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >

        <FaCloudUploadAlt className="upload-big-icon" />

        <h3>Drag & Drop Your CV</h3>

        <span>or</span>

        <button
          type="button"
          className="browse-btn"
        >
          Browse Files
        </button>

        <small>
          PDF • DOC • DOCX
          <br />
          Maximum file size: 5 MB
        </small>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          hidden
          onChange={handleFileChange}
        />

      </div>

      {formData.cv && (

        <div className="selected-file">

          <FaCheckCircle />

          <div>

            <strong>{formData.cv.name}</strong>

            <small>
              {(formData.cv.size / 1024 / 1024).toFixed(2)} MB
            </small>

          </div>

        </div>

      )}

    </section>
  );
}

export default CVUpload;