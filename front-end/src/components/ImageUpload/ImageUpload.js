import React, { useState, useRef } from "react";
import { UPLOAD_CONFIG } from "../../constants";
import "./ImageUpload.css";

const ImageUpload = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    if (files && files[0]) {
      const file = files[0];

      // Validate file type
      if (!UPLOAD_CONFIG.ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        alert(UPLOAD_CONFIG.IMAGE_UPLOAD_ERRORS.TYPE);
        return;
      }

      // Validate file size
      if (file.size > UPLOAD_CONFIG.MAX_FILE_SIZE) {
        alert(UPLOAD_CONFIG.IMAGE_UPLOAD_ERRORS.SIZE);
        return;
      }

      // Create preview and upload
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
        onImageUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInput = (e) => {
    handleFiles(e.target.files);
  };

  return (
    <div className="image-upload-container">
      <div
        className={`upload-area ${isDragging ? "dragging" : ""} ${
          preview ? "has-preview" : ""
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="image-preview" />
        ) : (
          <div className="upload-prompt">
            <i className="fas fa-cloud-upload-alt"></i>
            <p>Drag and drop an image here, or click to select</p>
            <span>
              Supports:{" "}
              {UPLOAD_CONFIG.ACCEPTED_IMAGE_TYPES.map((type) =>
                type.split("/")[1].toUpperCase()
              ).join(", ")}
              (max {Math.round(UPLOAD_CONFIG.MAX_FILE_SIZE / (1024 * 1024))}MB)
            </span>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          accept={UPLOAD_CONFIG.ACCEPTED_IMAGE_TYPES.join(",")}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
