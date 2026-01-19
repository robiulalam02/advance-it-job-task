const express = require('express');
const router = express.Router();
const stripe = require('../config/stripe');
const Order = require('../models/Order');
const { paymentSuccess, paymentCancel } = require('../controllers/paymentController');

// 1. Success and Cancel routes
router.get('/success', paymentSuccess);
router.get('/cancel', paymentCancel);

// 2. Webhook Route
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.log(`❌ Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        const orderId = session.metadata.orderId;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                isPaid: true,
                paidAt: Date.now(),
                status: 'Completed'
            },
            { new: true }
        );

        if (updatedOrder) {
            console.log(`✅ Order ${orderId} successfully updated to PAID`);
        } else {
            console.log(`❌ Order ${orderId} not found in database`);
        }
    }

    res.json({ received: true });
});

module.exports = router;