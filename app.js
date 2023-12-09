const express = require('express');
const app = express();
// const port = 3000;

// ルーティングの設定
const indexRouter = require('./routes/index');

// 静的ファイルのためのディレクトリを指定
app.use(express.static('public'));

// ホームページのルートを使用
app.use('/', indexRouter);

// リダイレクトロジック
app.get('/redirect', (req, res) => {
    const userAgent = req.headers['user-agent'];

    let redirectUrl;

    if (/iPhone|iPad|iPod/i.test(userAgent)) {
        // iOSデバイスの場合のリダイレクトURL
        redirectUrl = 'https://example.com/ios';
    } else if (/Android/i.test(userAgent)) {
        // Androidデバイスの場合のリダイレクトURL
        redirectUrl = 'https://example.com/android';
    } else {
        // その他のデバイスの場合のリダイレクトURL
        redirectUrl = 'https://example.com/other';
    }

    res.redirect(redirectUrl);
});

// サーバーを起動
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });

module.exports = app;
