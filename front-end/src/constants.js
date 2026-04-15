// API Configuration
const API_CONFIG = {
  BASE_URL: "http://localhost:3001",
  ENDPOINTS: {
    DETECT_OBJECTS: "/api/detection/detect",
  },
  FORM_FIELDS: {
    IMAGE: "image_file", // The field name expected by the backend
  },
};

// Color Configuration
const COLOR_CONFIG = {
  // Predefined colors for common objects (can be extended)
  PREDEFINED_COLORS: {
    person: "#FF6B6B", // coral red
    car: "#4ECDC4", // turquoise
    dog: "#45B7D1", // sky blue
    cat: "#96CEB4", // sage green
    bird: "#FFBE0B", // yellow
  },
  // Colors to use for random generation (all visually distinct and good for UI)
  COLOR_PALETTE: [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFBE0B",
    "#FF9F1C",
    "#2EC4B6",
    "#E71D36",
    "#011627",
    "#41EAD4",
    "#FDFFFC",
    "#235789",
    "#C1292E",
    "#F1D302",
    "#161925",
    "#235789",
    "#C1292E",
    "#F1D302",
    "#56E39F",
    "#5C80BC",
    "#84DCC6",
    "#95A5A6",
    "#D35400",
    "#1ABC9C",
    "#E74C3C",
  ],
};

// Utility function to generate a consistent color for a class
const getColorForClass = (className) => {
  // First check predefined colors
  if (COLOR_CONFIG.PREDEFINED_COLORS[className.toLowerCase()]) {
    return COLOR_CONFIG.PREDEFINED_COLORS[className.toLowerCase()];
  }

  // If no predefined color, generate one based on the class name
  const index = className
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return COLOR_CONFIG.COLOR_PALETTE[index % COLOR_CONFIG.COLOR_PALETTE.length];
};

// File Upload Configuration
const UPLOAD_CONFIG = {
  ACCEPTED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/jpg"],
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  IMAGE_UPLOAD_ERRORS: {
    TYPE: "Please upload a valid image file (JPEG, PNG)",
    SIZE: "Image size should be less than 5MB",
  },
};

// UI Configuration
const UI_CONFIG = {
  CONFIDENCE_THRESHOLD: 0.5, // 50% confidence threshold for displaying detections
  ANIMATION_DURATION: 200, // milliseconds
  MOBILE_BREAKPOINT: 480,
  TABLET_BREAKPOINT: 768,
};

// Detection Results Configuration
const DETECTION_CONFIG = {
  MIN_CONFIDENCE_DISPLAY: 0.2, // Only show detections above 20% confidence
  CONFIDENCE_COLORS: {
    HIGH: "#28a745", // > 80%
    MEDIUM: "#ffc107", // 50-80%
    LOW: "#dc3545", // < 50%
  },
};

// Error Messages
const ERROR_MESSAGES = {
  UPLOAD_FAILED: "Failed to upload image. Please try again.",
  DETECTION_FAILED: "Failed to process image. Please try again.",
  NETWORK_ERROR: "Network error. Please check your connection.",
  SERVER_ERROR: "Server error. Please try again later.",
};

// Loading States
const LOADING_STATES = {
  INITIAL: "INITIAL",
  UPLOADING: "UPLOADING",
  PROCESSING: "PROCESSING",
  COMPLETE: "COMPLETE",
  ERROR: "ERROR",
};

// Export all constants
export {
  API_CONFIG,
  UPLOAD_CONFIG,
  UI_CONFIG,
  DETECTION_CONFIG,
  ERROR_MESSAGES,
  LOADING_STATES,
  COLOR_CONFIG,
  getColorForClass,
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => `${API_CONFIG.BASE_URL}${endpoint}`;
