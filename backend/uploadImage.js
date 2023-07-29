
// uploadMiddleware.js

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config(); // Load environment variables from .env file

// Cloudinary configuration
cloudinary.config({ cloud_name: 'ddaf8ftoj', 
api_key: '576789522748994', 
api_secret: '9G4HAkps8MsWp9FYa57nUo-aPJw' 
});
// Multer configuration for file upload
const upload = multer({ dest: 'images/' });
const uploadMiddleware = async (req, res, next) => {
  try {
    await new Promise((resolve, reject) => {
      upload.single('image')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: 'Error uploading image' });
        } else if (err) {
          return res.status(500).json({ error: 'Server error' });
        }

        resolve(); // Resolve the promise when the upload is successful
      });
    });

    const result = await cloudinary.uploader.upload(req.file.path);
    const imageUrl = result.secure_url;
    req.imageUrl = imageUrl;
    next();
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};



module.exports = uploadMiddleware;


