const express = require('express');
const cors = require('cors');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(cors());

// Webhook Route (Must be before express.json() for raw body access)
app.use('/api/payments/webhook', require('./routes/paymentRoutes'));

app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Custom Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;