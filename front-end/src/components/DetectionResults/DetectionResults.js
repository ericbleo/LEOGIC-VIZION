import React, { useState } from "react";
import "./DetectionResults.css";

// Constants for styling
const DEFAULT_COLOR = "#2196F3"; // Default blue color for all detections
const SELECTION_COLOR = "#FF1493"; // Deep pink for detection selection
const CLASS_SELECTION_COLOR = "#FF8C00"; // Dark orange for class selection
const SELECTION_OPACITY = {
  BORDER: "FF", // 100% opacity
  FILL: "33", // 20% opacity
  NORMAL: "1A", // 10% opacity
};

const DetectionResults = ({
  results,
  isLoading,
  error,
  onDetectionSelect,
  selectedDetectionIndex,
}) => {
  const [selectedClass, setSelectedClass] = useState(null);

  if (error) {
    return (
      <div className="detection-error">
        <i className="fas fa-exclamation-circle"></i>
        <p>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="detection-loading">
        <div className="spinner"></div>
        <p>Analyzing image...</p>
      </div>
    );
  }

  if (!results || !results.detections || results.detections.length === 0) {
    return null;
  }

  const handleClassSelect = (label) => {
    setSelectedClass(selectedClass === label ? null : label);
    // Reset detection selection when changing class
    onDetectionSelect(null);
  };

  // Filter detections based on selected class
  const filteredDetections = selectedClass
    ? results.detections
        .map((detection, index) => ({
          ...detection,
          originalIndex: index, // Keep track of original index
        }))
        .filter((detection) => detection.label === selectedClass)
    : results.detections.map((detection, index) => ({
        ...detection,
        originalIndex: index, // Keep track of original index for all detections
      }));

  return (
    <div className="detection-results">
      <h3>Detection Results</h3>
      <div className="detection-summary">
        <h4>Objects Found:</h4>
        <ul>
          {Object.entries(results.counts).map(([label, count]) => {
            const isSelected = selectedClass === label;

            return (
              <li
                key={label}
                onClick={() => handleClassSelect(label)}
                className={isSelected ? "selected" : ""}
                style={{
                  backgroundColor: isSelected
                    ? `${CLASS_SELECTION_COLOR}22`
                    : `${DEFAULT_COLOR}22`,
                  color: isSelected ? CLASS_SELECTION_COLOR : DEFAULT_COLOR,
                  borderColor: isSelected
                    ? CLASS_SELECTION_COLOR
                    : DEFAULT_COLOR,
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: "bold",
                  padding: "8px 12px",
                }}
              >
                <span className="object-label">{label}</span>: {count}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="results-grid">
        {filteredDetections.map((detection, index) => {
          const isSelected = selectedDetectionIndex === detection.originalIndex;
          const displayColor = isSelected ? SELECTION_COLOR : DEFAULT_COLOR;

          return (
            <div
              key={detection.originalIndex}
              className={`result-card ${isSelected ? "selected" : ""}`}
              style={{
                borderLeft: `4px solid ${displayColor}`,
                backgroundColor: `${displayColor}${
                  isSelected ? SELECTION_OPACITY.FILL : SELECTION_OPACITY.NORMAL
                }`,
                boxShadow: isSelected ? `0 0 10px ${SELECTION_COLOR}` : "none",
              }}
              onClick={() => onDetectionSelect(detection.originalIndex)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onDetectionSelect(detection.originalIndex);
                }
              }}
            >
              <div className="result-header">
                <span
                  className="object-name"
                  style={{
                    color: displayColor,
                    textShadow: isSelected
                      ? "0 0 5px rgba(255, 255, 255, 0.5)"
                      : "none",
                  }}
                >
                  {detection.label}
                </span>
                <span
                  className="confidence"
                  style={{
                    backgroundColor: `${displayColor}22`,
                    color: displayColor,
                    fontWeight: isSelected ? "600" : "500",
                  }}
                >
                  {(detection.confidence * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetectionResults;
