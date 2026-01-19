const Order = require('../models/Order');
const Product = require('../models/Product');
const stripe = require('../config/stripe');

exports.createOrder = async (req, res, next) => {
    try {
        const { product_id, quantity } = req.body;

        // 1. Find the product
        const product = await Product.findById(product_id);
        if (!product) {
            res.status(404);
            throw new Error('Product not found');
        }

        // 2. Create Order in our Database
        const order = await Order.create({
            user: req.user._id,
            orderItems: [{
                name: product.name,
                qty: quantity,
                price: product.price,
                product: product._id
            }],
            totalPrice: product.price * quantity,
            status: 'Pending'
        });

        // 3. Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: { name: product.name },
                    unit_amount: product.price * 100, // Stripe expects cents ($25 = 2500)
                },
                quantity: quantity,
            }],
            mode: 'payment',
            // Pass order ID in metadata so we can find it later in the webhook
            metadata: { orderId: order._id.toString() },
            success_url: `${process.env.BASE_URL}/api/payments/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.BASE_URL}/api/payments/cancel`,
        });

        res.status(201).json({
            success: true,
            orderId: order._id,
            stripeUrl: session.url // Return this to the user
        });

    } catch (error) {
        next(error);
    }
};