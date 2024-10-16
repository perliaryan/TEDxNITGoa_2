const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
// const createOrderRoutes = require('./createOrder');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter); // Apply rate limiting to all routes under /api

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tedx_database', { useNewUrlParser: true, useUnifiedTopology: true });

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
app.post('/api/submit-form', async (req, res) => {
  try {
    console.log(req.body);
    const newSubmission = new Submission(req.body);
    await newSubmission.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting form', error: error.message });
  }
});

// Route to get all submissions
app.get('/api/submissions', async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching submissions', error: error.message });
  }
});

// // Use the createOrder routes
// app.use('/api', createOrderRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});