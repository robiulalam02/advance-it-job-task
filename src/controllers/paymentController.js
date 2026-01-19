exports.paymentSuccess = (req, res) => {
    res.send(`
        <div style="text-align: center; margin-top: 50px; font-family: sans-serif;">
            <h1 style="color: green;">✔ Payment Successful!</h1>
            <p>Thank you for your purchase. Your order is being processed.</p>
            <p>You can close this window now.</p>
        </div>
    `);
};

exports.paymentCancel = (req, res) => {
    res.send(`
        <div style="text-align: center; margin-top: 50px; font-family: sans-serif;">
            <h1 style="color: red;">❌ Payment Cancelled</h1>
            <p>Your payment was not completed. You can try again from your cart.</p>
            <a href="/">Go Back to Home</a>
        </div>
    `);
};