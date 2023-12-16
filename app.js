const express = require('express');
const AWS = require('aws-sdk');
const app = express();
require('dotenv').config();

// AWS DynamoDBの設定
AWS.config.update({
  region: 'ap-northeast-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

// ボディパーサーの設定
app.use(express.urlencoded({ extended: true }));

// 静的ファイルとルーティングの設定
app.use(express.static('public'));

// アンケート送信後の処理
app.post('/submit-survey', (req, res) => {
    const data = req.body;
    const params = {
        TableName: 'YourTableName', // DynamoDBのテーブル名
        Item: {
            'ID': Date.now().toString(), // ユニークなID
            'Gender': data.gender,
            'Age': data.age,
            'Location': data.location,
            'Purpose': data.purpose
        }
    };

    // DynamoDBにデータを保存
    dynamoDb.put(params, (error, result) => {
        if (error) {
            console.error('データの保存に失敗:', error);
            res.send('エラーが発生しました');
        } else {
            // 保存成功時の処理
            res.send('アンケートが送信されました');
        }
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
