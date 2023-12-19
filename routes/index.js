const express = require('express');
const path = require('path');
const router = express.Router();

// ホームページのルートを設定
router.get('/', (req, res) => {
    // ここでは例として `req.session.isLoggedIn` を使用していますが、
    // 実際の認証メカニズムに応じて調整してください。
    if (req.session.isLoggedIn) {
        // ユーザーがログインしている場合、ホームページにリダイレクト
        res.sendFile(path.join(__dirname, '../views/home.html'));
    } else {
        // ユーザーがログインしていない場合、ログインページにリダイレクト
        res.sendFile(path.join(__dirname, '../views/login.html'));
    }
});

module.exports = router;
