const express = require('express');
const admin = require('firebase-admin');
const app = express();
const indexRouter = require('./routes/index');
const firebaseConfig = require('firebaseConfig');

// Firebaseの初期化
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: firebaseConfig.databaseURL
});

// Firebase Realtime Databaseのインスタンスを取得
const db = admin.database();

// ボディパーサーの設定（フォームデータを解析するために必要）
app.use(express.urlencoded({ extended: true }));

// 静的ファイルのためのディレクトリを指定
app.use(express.static('public'));
app.use('/', indexRouter);
// アンケートページへのルーティング
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/survey.html');
});

// アンケート送信後の処理
app.post('/submit-survey', (req, res) => {
    // フォームからのデータを取得
    const data = req.body;

    // Firebase Realtime Databaseにデータを保存
    const ref = db.ref('surveys');
    ref.push().set(data, (error) => {
        if (error) {
            console.error('データの保存に失敗:', error);
            res.send('エラーが発生しました');
        } else {
            // ユーザーエージェントに基づいてリダイレクト
            const userAgent = req.headers['user-agent'];
            if (/iPhone|iPad|iPod/i.test(userAgent)) {
                res.redirect('https://example.com/ios');
            } else if (/Android/i.test(userAgent)) {
                res.redirect('https://example.com/android');
            } else {
                res.redirect('https://example.com/other');
            }
        }
    });
});

module.exports = app;
