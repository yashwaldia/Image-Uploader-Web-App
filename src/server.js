const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cors = require('cors');

// In-memory store for image view counts
const imageViews = {};

cloudinary.config({
  cloud_name: 'dsbg34rgb',
  api_key: '722212589959869',
  api_secret: 'QMymHDR6MxOuszV3QqyX-omSq7w'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    resource_type: 'image', // Specify it's an image file
  },
});

const upload = multer({ storage: storage });
const app = express();

app.use(cors());
app.use(express.json());

// Route to upload an image to Cloudinary
app.post('/upload', upload.single('image'), (req, res) => {
  const imageUrl = req.file.path;
  // Initialize view count to 0 when the image is uploaded
  imageViews[imageUrl] = 0;
  res.json({ url: imageUrl });
});

// Route to update and return the image view count
app.post('/view-image', (req, res) => {
  const { imageUrl } = req.body;

  if (!imageViews[imageUrl]) {
    return res.status(404).json({ error: 'Image not found' });
  }

  // Increment the view count
  imageViews[imageUrl] += 1;

  // Return the updated view count
  res.json({ views: imageViews[imageUrl] });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
