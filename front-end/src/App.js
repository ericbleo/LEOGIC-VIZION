import React, { useState, useRef } from "react";
import ImageUpload from "./components/ImageUpload/ImageUpload";
import DetectionResults from "./components/DetectionResults/DetectionResults";
import DetectionVisualization from "./components/DetectionVisualization/DetectionVisualization";
import { LOADING_STATES, ERROR_MESSAGES } from "./constants";
import { processImageUpload } from "./utils/imageUtils";
import "./App.css";

function App() {
  const [loadingState, setLoadingState] = useState(LOADING_STATES.INITIAL);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedDetectionIndex, setSelectedDetectionIndex] = useState(null);
  const imageRef = useRef(null);

  const handleImageUpload = async (file) => {
    try {
      // Reset states
      setLoadingState(LOADING_STATES.UPLOADING);
      setError(null);
      setResults(null);
      setImageUrl(URL.createObjectURL(file));
      setSelectedDetectionIndex(null);

      // Process the image
      const processedResults = await processImageUpload(file);
      setResults(processedResults);
      setLoadingState(LOADING_STATES.COMPLETE);
    } catch (err) {
      setError(err.message || ERROR_MESSAGES.SERVER_ERROR);
      setLoadingState(LOADING_STATES.ERROR);
    }
  };

  const handleDetectionSelect = (index) => {
    setSelectedDetectionIndex(index);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>LEOGIC VIZION ANALYZER</h1>
        <p>Upload an image to detect and analyze objects</p>
      </header>

      <main className="app-main">
        <ImageUpload onImageUpload={handleImageUpload} />
        <div className="detection-container">
          <DetectionVisualization
            imageUrl={imageUrl}
            imageRef={imageRef}
            results={results}
            selectedDetectionIndex={selectedDetectionIndex}
          />
          <DetectionResults
            results={results}
            isLoading={loadingState === LOADING_STATES.UPLOADING}
            error={error}
            onDetectionSelect={handleDetectionSelect}
            selectedDetectionIndex={selectedDetectionIndex}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
