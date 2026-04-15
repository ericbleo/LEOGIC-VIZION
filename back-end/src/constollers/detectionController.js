const DetectionInteractor = require("../interactors/detectionInteractor");

class DetectionController {
  constructor() {
    this.detector = new DetectionInteractor();
  }

  async detectObjects(req, res) {
    try {
      if (!req.file || !req.file.buffer) {
        return res.status(400).json({
          success: false,
          message: "No image file provided",
        });
      }

      const detectedObjects = await this.detector.detectObjects(
        req.file.buffer
      );

      // Calculate object counts
      const objectCounts = detectedObjects.reduce(
        (acc, [_, __, ___, ____, label, _____]) => {
          acc[label] = (acc[label] || 0) + 1;
          return acc;
        },
        {}
      );

      return res.status(200).json({
        success: true,
        data: detectedObjects,
        counts: objectCounts,
      });
    } catch (error) {
      console.error("Error in object detection:", error);
      return res.status(500).json({
        success: false,
        message: "Error processing image",
        error: error.message,
      });
    }
  }
}

module.exports = DetectionController;
