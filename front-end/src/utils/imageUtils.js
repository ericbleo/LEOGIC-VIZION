import {
  UPLOAD_CONFIG,
  API_CONFIG,
  ERROR_MESSAGES,
  getApiUrl,
  getColorForClass,
} from "../constants";

export const validateImage = (file) => {
  if (!UPLOAD_CONFIG.ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(UPLOAD_CONFIG.IMAGE_UPLOAD_ERRORS.TYPE);
  }
  if (file.size > UPLOAD_CONFIG.MAX_FILE_SIZE) {
    throw new Error(UPLOAD_CONFIG.IMAGE_UPLOAD_ERRORS.SIZE);
  }
};

export const transformDetectionData = (detections) => {
  return detections.map(([x, y, width, height, label, confidence]) => {
    const color = getColorForClass(label);
    return {
      bbox: { x, y, width, height },
      label,
      confidence,
      color,
    };
  });
};

export const processImageUpload = async (file) => {
  // Validate image
  validateImage(file);

  // Prepare form data
  const formData = new FormData();
  formData.append(API_CONFIG.FORM_FIELDS.IMAGE, file);

  // Make API request
  const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.DETECT_OBJECTS), {
    method: "POST",
    body: formData,
  });

  // Handle non-200 responses
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || ERROR_MESSAGES.DETECTION_FAILED);
  }

  // Handle successful response
  const data = await response.json();
  if (data.success) {
    return {
      detections: transformDetectionData(data.data),
      counts: data.counts,
    };
  } else {
    throw new Error(data.message || ERROR_MESSAGES.DETECTION_FAILED);
  }
};
