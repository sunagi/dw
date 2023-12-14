const express = require('express');
const AWS = require('aws-sdk');
const app = express();
const indexRouter = require('./routes/index');
require('dotenv').config();

// AWS DynamoDBの設定
AWS.config.update({
  region: 'ap-northeast-1', // 適切なリージョンに設定
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

// ボディパーサーの設定
app.use(express.urlencoded({ extended: true }));

// 静的ファイルとルーティングの設定
app.use(express.static('public'));
app.use('/', indexRouter);

// アンケート送信後の処理
app.post('/submit-survey', (req, res) => {
    const data = req.body;
    const params = {
        TableName: 'YUUUU', // DynamoDBのテーブル名
        Item: {
            // ここにDynamoDBに保存するデータ項目を設定
            'ID': Date.now().toString(), // ユニークなID
            ...data
        }
    };

    // DynamoDBにデータを保存
    dynamoDb.put(params, (error, result) => {
        if (error) {
            console.error('データの保存に失敗:', error);
            res.send('エラーが発生しました');
        } else {
            // リダイレクト処理
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
