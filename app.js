'use strict';
let express = require('express');
let fs = require("fs");
let request = require('request');
let face = require('./faceapi.js');
let env = require('dotenv').config();

const app = express();
app.use(express.json({ extended: true, limit: '10mb' })); // サイズ上限を10MBに拡張

app.post('/', (req, res) => {
    const bodyjson = req.body.data; 
    const username = bodyjson.name;
    const twitter_id = bodyjson.twitter_id;
    const github_id = bodyjson.github_id;
    const face_image = bodyjson.face_image;

    console.log(username);

    // faceAPIに問い合わせ
    let face_b64 = Buffer.from(face_image, 'base64');
    let faceId = face.registerFace(face_b64);
    
    res.send("OK");
});

app.post('/detect', (req, res) => {
    const bodyjson = req.body.data;
    console.log(bodyjson);
    res.send("ok");
})

app.listen(3000, () => console.log('Example app listening on port 3000!'));
