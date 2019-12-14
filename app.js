'use strict';
let express = require('express');
let fs = require("fs");
let request = require('request');
let face = require('./faceapi.js');
let twitter = require('./Twitter.js');
require('dotenv').config();

const app = express();
app.use(express.json({ extended: true, limit: '10mb' })); // サイズ上限を10MBに拡張

// 登録API
app.post('/', (req, res) => {
    const bodyjson = req.body.data; 
    const username = bodyjson.name;
    const twitter_id = bodyjson.twitter_id;
    const github_id = bodyjson.github_id;
    const face_image = bodyjson.face_image;

    console.log(username);

    // faceAPIに問い合わせ
    let face_b64 = Buffer.from(face_image, 'base64');
    // let faceId = face.registerFace(face_b64);
    const faceId = "neko";

    const response = registerUser(face_b64, twitter_id, github_id).then(value => {
        console.log(value);
        return value;
    });
    // let twitter_info = twitter.getTwitterProfile(twitter_id).then(val => console.log(val));

    res.send(response);
});

async function registerUser(face_b64, twitter_id, github_id) {
    try {
        const faceId = await face.registerFace(face_b64);
        if (faceId == null) {
            throw new Error('face is not found');
        }
        const [twitter_info] = await Promise.all(
            [twitter.getTwitterProfile(twitter_id)]);
        
        // DBに保存
        return;
    } catch (err) {
        console.log(err);
        return;
    }
}


// 顔識別&情報取得API
app.post('/detect', (req, res) => {
    const bodyjson = req.body.data;
    // const faceImage = bodyjson.face_image;
    // const faceImage = Buffer.from(bodyjson.face_imageface_image, 'base64');
    const faceImage = fs.readFileSync('./image/hashimoto_gopher.png'); // ローカルから読み込む場合
    const persistedFaceId = face.detectFace(faceImage)
        .then(faceId => face.find(faceId));
    
    console.log(persistedFaceId);

    res.send("ok");
})

// persongroup作成API : not yet
app.post('/create/person-group', (req, res) => {
    const bodyjson = req.body.data;
    const groupName = bodyjson.name;
    const faceId = face.createPersonGroup(groupName); 

    console.log(bodyjson);

    res.send("ok");
})

app.listen(3000, () => console.log('Example app listening on port 3000!'));
