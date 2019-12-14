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
    // const bodyjson = req.body.data; 
    // const username = bodyjson.name;
    // const twitter_id = bodyjson.twitter_id;
    // const github_id = bodyjson.github_id;
    // const face_image = bodyjson.face_image;
    let face_b64 =  fs.readFileSync('./face_images/hashimoto.JPG');
    // let face_b64 = Buffer.from(face_image, 'base64');
    // faceAPIに問い合わせ
    // asyncの即時関数で囲んでやる https://qiita.com/yukin01/items/1a36606439123525dc6d
    (async() => {
        let faceId = await face.registerFace(face_b64);
        let response = JSON.stringify({ "faceId": faceId })
        console.log(response.faceId);
        res.send(response);
    })()    
    // let twitter_info = twitter.getTwitterProfile(twitter_id).then(val => console.log(val));
    // let github_info =  
});

// 顔識別&情報取得API
app.post('/detect', (req, res) => {
    const bodyjson = req.body.data;
    // const faceImage = bodyjson.face_image;
    const faceImage = Buffer.from(bodyjson.face_imageface_image, 'base64');
    
    const faceId = face.detectFace(faceImage).then(val => console.log(val));

    console.log(bodyjson);

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
