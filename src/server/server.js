const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tedx_contact_form', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema for form submissions
const submissionSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  contactNumber: String,
  comments: String,
  newsletter: Boolean
}, { timestamps: true });

const Submission = mongoose.model('Submission', submissionSchema);

// Route to handle form submissions
app.post('/submit-form', async (req, res) => {
  try {
    console.log(req.body)
    const newSubmission = new Submission(req.body);
    await newSubmission.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting form', error: error.message });
  }
});

// Route to get all submissions
app.get('/submissions', async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching submissions', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});