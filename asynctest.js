'use strict';
let express = require('express');
let fs = require("fs");
let request = require('request');
let face = require('./faceapi.js');
require('dotenv').config();

const app = express();
app.use(express.json({ extended: true, limit: '10mb' })); // サイズ上限を10MBに拡張

// test
app.post('/test', (req, res) => {
    console.log('てｓｔ');
    sample().then(value => {
        console.log(value); // => resolve!!
    });
    console.log('ねこ');
    res.send("ok"); 
})

// test
async function sample() {
    return "SAMPLE";
}

app.listen(3000, () => console.log('Example app listening on port 3000!'));
