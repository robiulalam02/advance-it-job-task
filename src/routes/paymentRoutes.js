const express = require('express');
const router = express.Router();

router.post('/webhook', (req, res) => res.send('Webhook received'));

module.exports = router;