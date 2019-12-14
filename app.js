'use strict';
let express = require('express');
let fs = require("fs");
let request = require('request');
let face = require('./faceapi.js');
require('dotenv').config();

const app = express();
app.use(express.json({ extended: true, limit: '10mb' })); // サイズ上限を10MBに拡張

app.post('/', (req, res) => {
    const bodyjson = req.body; 
    const username = bodyjson.name;
    const twitter_id = bodyjson.twitter_id;
    const github_id = bodyjson.github_id;
    const face_image = bodyjson.face_image;

    console.log(username);
    
    // faceAPIに問い合わせ
    let face_b64 = Buffer.from(face_image, 'base64');
    // face.registerFace(face_b64);
    
    res.send("OK");
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
