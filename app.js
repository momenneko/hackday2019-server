'use strict';
let express = require('express');
let fs = require("fs");
let request = require('request');
let face = require('./faceapi.js');
let github = require('./github_api.js');
let twitter = require('./twitter.js');
let db = require('./operateDB.js');
require('dotenv').config();

const app = express();
app.use(express.json({ extended: true, limit: '10mb' })); // サイズ上限を10MBに拡張

app.get('/', (req, res) => {
    res.send("health check ok!");
});

// 登録API
app.post('/register', (req, res) => {
    const bodyjson = req.body.data; 
    const username = bodyjson.name;
    const twitter_id = bodyjson.twitter_id;
    const github_id = bodyjson.github_id;
    const face_image = bodyjson.face_image;

    // let face_b64 =  fs.readFileSync('./face_images/hashimoto.JPG');
    // const face_b64 = fs.readFileSync('./face_images/hashimoto_gopher.png');    
    const face_b64 = fs.readFileSync('./face_images/kikuchi.JPG');
    // let face_b64 = Buffer.from(face_image, 'base64');

    // faceAPIに問い合わせ
    // asyncの即時関数で囲んでやる https://qiita.com/yukin01/items/1a36606439123525dc6d
    (async() => {
        // TODO : parallel
        let faceId = await face.registerFace(face_b64);
        let twitter_info = await twitter.getTwitterProfile(twitter_id);
        let github_info = await github.githubMain(github_id);

        console.log(faceId);
        console.log(twitter_info);
        console.log(github_info);
        
        let saved = await db.register(faceId, username, twitter_info, github_info);
        
        // TODO: error handling
        // let response = JSON.stringify({});
        // res.send(response);
        res.send("OK");
    })()    
    // let github_info =  

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
app.get('/getinfo', (req, res) => {
    const bodyjson = req.body.data;
    // const faceImage = bodyjson.face_image;
    // const faceImage = Buffer.from(bodyjson.face_image, 'base64');
    // const faceImage = fs.readFileSync('./face_images/hashimoto_gopher.png'); // ローカルから読み込む場合
    const faceImage = fs.readFileSync('./face_images/kikuchi.JPG');

    // TODO: errorがうまくhandlingされない
    face.detectFace(faceImage)
        .then(faceId => {
            return face.find(faceId);
        }).then(persistedFaceId => {
            console.log(`detect ---------${persistedFaceId}`);

            return db.get(persistedFaceId);
        }).then(info => {
            console.log(info);
            const response = {'data': info};
            console.log(response); 
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
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
