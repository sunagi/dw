const express = require('express');
const router = express.Router();

// ホームページのルートを設定
router.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;
