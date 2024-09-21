const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cors = require('cors');


cloudinary.config({
  cloud_name: 'dsbg34rgb',
  api_key: '722212589959869',
  api_secret: 'QMymHDR6MxOuszV3QqyX-omSq7w'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    resource_type: 'image', 
  },
});

const upload = multer({ storage: storage });
const app = express();

app.use(cors());
app.use(express.json());

app.post('/upload', upload.single('image'), (req, res) => {
  const imageUrl = req.file.path;
  res.json({ url: imageUrl });
});



app.listen(5000, () => {
  console.log('Server running on port 5000');
});
