import React, { useEffect, useRef, useState } from "react";
import "./DetectionVisualization.css";

// Constants for styling
const DEFAULT_COLOR = "#2196F3"; // Default blue color for all detections
const SELECTION_COLOR = "#FF1493"; // Deep pink
const SELECTION_OPACITY = {
  BORDER: "FF", // 100% opacity
  FILL: "33", // 20% opacity
  NORMAL: "1A", // 10% opacity
};

const DetectionVisualization = ({
  imageUrl,
  imageRef,
  results,
  selectedDetectionIndex,
}) => {
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const containerRef = useRef(null);

  // Update dimensions when image loads or resizes
  useEffect(() => {
    const updateDimensions = () => {
      if (imageRef.current) {
        const { naturalWidth, naturalHeight } = imageRef.current;
        const displayWidth = imageRef.current.clientWidth;
        const displayHeight = imageRef.current.clientHeight;

        setImageDimensions({
          width: displayWidth,
          height: displayHeight,
          scaleX: displayWidth / naturalWidth,
          scaleY: displayHeight / naturalHeight,
        });
      }
    };

    // Initial update
    if (imageRef.current && imageRef.current.complete) {
      updateDimensions();
    }

    // Update on image load
    const imageElement = imageRef.current;
    if (imageElement) {
      imageElement.addEventListener("load", updateDimensions);
    }

    // Update on window resize
    window.addEventListener("resize", updateDimensions);

    return () => {
      if (imageElement) {
        imageElement.removeEventListener("load", updateDimensions);
      }
      window.removeEventListener("resize", updateDimensions);
    };
  }, [imageUrl]);

  const calculateScaledPosition = (bbox) => {
    if (!imageDimensions.scaleX || !imageDimensions.scaleY) return bbox;

    return {
      x: Math.round(bbox.x * imageDimensions.scaleX),
      y: Math.round(bbox.y * imageDimensions.scaleY),
      width: Math.round(bbox.width * imageDimensions.scaleX),
      height: Math.round(bbox.height * imageDimensions.scaleY),
    };
  };

  if (!imageUrl) return null;

  return (
    <div className="image-container" ref={containerRef}>
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Uploaded"
        className="analyzed-image"
      />
      {results?.detections && imageDimensions.width > 0 && (
        <div className="bounding-boxes">
          {results.detections.map((detection, index) => {
            const scaledBBox = calculateScaledPosition(detection.bbox);
            const isSelected = selectedDetectionIndex === index;

            return (
              <div
                key={index}
                className={`bounding-box ${isSelected ? "selected" : ""}`}
                style={{
                  left: `${scaledBBox.x}px`,
                  top: `${scaledBBox.y}px`,
                  width: `${scaledBBox.width}px`,
                  height: `${scaledBBox.height}px`,
                  borderColor: isSelected ? SELECTION_COLOR : DEFAULT_COLOR,
                  backgroundColor: `${
                    isSelected ? SELECTION_COLOR : DEFAULT_COLOR
                  }${
                    isSelected
                      ? SELECTION_OPACITY.FILL
                      : SELECTION_OPACITY.NORMAL
                  }`,
                  boxShadow: isSelected
                    ? `
                    0 0 2px #fff,
                    0 0 4px #fff,
                    0 0 8px ${SELECTION_COLOR},
                    0 0 12px ${SELECTION_COLOR},
                    inset 0 0 8px ${SELECTION_COLOR}
                  `
                    : "none",
                }}
              >
                <span
                  className={`label ${isSelected ? "selected" : ""}`}
                  style={{
                    backgroundColor: isSelected
                      ? SELECTION_COLOR
                      : DEFAULT_COLOR,
                    top: scaledBBox.y < 30 ? "0" : "-25px",
                    textShadow: isSelected ? "0 0 5px #fff" : "none",
                  }}
                >
                  {detection.label} ({Math.round(detection.confidence * 100)}%)
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DetectionVisualization;
