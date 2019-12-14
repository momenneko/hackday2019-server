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
    // sample().then(value => {
    //     console.log(value); // => resolve!! 
    //     return value;
    // });
    sampletest().then(([a, b, c]) => {
        console.log(a, b, c);
    });
    console.log('ねこ');
    res.send("ok"); 
})

async function sampletest() {
    const [a, b] = await Promise.all([sample(), sample()]);
    console.log("aaa")
    console.log(a);
    const c = await sample2();

    return [a, b, c];
}

// test
async function sample() {
    return "SAMPLE";
}
 
async function sample2() {
    return "2";
}

app.listen(3000, () => console.log('Example app listening on port 3000!'));
