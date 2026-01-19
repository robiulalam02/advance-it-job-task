const express = require('express');
const cors = require('cors');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

app.use(cors());

app.use('/api/payments', require('./routes/paymentRoutes'));

// Standard JSON middleware for everything else
app.use(express.json());

// Other Routes
app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;