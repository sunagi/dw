const express = require('express');
const path = require('path');
const router = express.Router();

// ホームページのルートを設定
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/survey.html'));
});

module.exports = router;
