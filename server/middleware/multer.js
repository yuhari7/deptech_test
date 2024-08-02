// utils/upload.js
import multer from "multer";
import path from "path";

// Set storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the destination folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Set the file name
  },
});

// Set file filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Invalid file type");
    error.status = 400;
    return cb(error);
  }
  cb(null, true);
};

// Initialize multer with storage and file filter
export const upload = multer({ storage, fileFilter });
