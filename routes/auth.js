const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { dynamoDb } = require('../app'); // app.js から DynamoDB クライアントをインポート

// ログインのルート
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const params = {
        TableName: 'YUUUU', // DynamoDB のテーブル名
        Key: {
            'email': email
        }
    };

    try {
        // DynamoDB からユーザーデータを取得
        const data = await dynamoDb.get(params).promise();
        const user = data.Item;

        if (user && await bcrypt.compare(password, user.password)) {
            // ログイン成功、セッション設定等をここで行う
            res.redirect('/home');
        } else {
            // ログイン失敗
            res.redirect('/login');
        }
    } catch (error) {
        console.error('ログインエラー:', error);
        res.redirect('/login');
    }
});

module.exports = router;
