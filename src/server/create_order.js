const express = require('express');
const axios = require('axios');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const Razorpay = require('razorpay');

const app = express();

// Middleware
app.use(express.json());
app.use(helmet()); // Adds various HTTP headers for security

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/create-order', limiter);

// Environment variables (use dotenv in a real application)
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.error('RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set');
  process.exit(1);
}

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET
});

// Validation middleware
const validateOrderInput = [
  body('name').trim().isLength({ min: 2, max: 100 }).escape(),
  body('email').isEmail().normalizeEmail(),
  body('phone').isMobilePhone(),
  body('ticketType').isIn(['general', 'vip', 'student']),
  body('quantity').isInt({ min: 1, max: 10 })
];

app.post('/create-order', validateOrderInput, async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, ticketType, quantity } = req.body;

  try {
    // Calculate the amount based on ticket type and quantity
    const ticketPrices = {
      general: 1000,
      vip: 2000,
      student: 500
    };
    const amount = ticketPrices[ticketType] * quantity;

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        name: name,
        email: email,
        phone: phone,
        ticketType: ticketType,
        quantity: quantity
      }
    });

    // In a production environment, you would typically save the order details to your database here

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      razorpayKeyId: RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'An error occurred while processing your request' });
  }
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(5000, () => console.log('Server running on port 5000'));