const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017/convocation-form';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Define schema for form submissions
const formSchema = new mongoose.Schema({
  fields: Object,
  files: Object,
  submittedAt: { type: Date, default: Date.now }
});
const FormSubmission = mongoose.model('FormSubmission', formSchema);

app.use(cors());

const upload = multer({ dest: 'uploads/' });

// Save form data to MongoDB
app.post('/api/submit', upload.fields([
  { name: 'idProofFile' },
  { name: 'passportPhotoFile' },
  { name: 'signatureFile' },
  { name: 'paymentScreenshotFile' },
]), async (req, res) => {
  try {
    const submission = new FormSubmission({
      fields: req.body,
      files: req.files
    });
    await submission.save();
    console.log('Form saved to MongoDB!');
    res.send('success');
  } catch (err) {
    console.error('Error saving form:', err);
    res.status(500).send('Database error');
  }
});

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});