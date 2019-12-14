'use strict';
const fetch = require("node-fetch");
require('dotenv').config();

// authorization
var options = {
    'headers': {
        'Authorization': process.env.GIT_AUTH
    }
};


async function fetchFirstRepo(userName){ // e.g. "octocat"
    try {
        const url = `https://api.github.com/users/${userName}/repos`;
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);
    // return  いい感じreturnしてね
    } catch (error) {
        console.log(error);
    }
    // const hoge = 
    //     .then(response => {
    //         console.log(response.status); // => 200
    //         response.json().then(userInfo => {
    //         // console.log(userInfo[0].full_name)
    //         return userInfo[0]. // 1番目のみ取得
    //     });
    // });
}

// get languages
async function fetchMainLanguage(userName, repoName){ // e.g. "octocat", "Hello-World"
    fetch(`https://api.github.com/repos/${userName}/${repoName}/languages`, options)
        .then(response => {
            console.log(response.status); // => 200
            response.json().then(repoInfo => {
            // console.log(Object.keys(repoInfo)[0])
            return Object.keys(repoInfo)
        });
    });
}

async function main(userName){
    // fetchFirstRepoを、undefinedが入らないようにしたい
    const repoName = await fetchFirstRepo(userName);
    console.log(repoName)
    // repoNameに値が入るのを待って、次の処理を行いたい
    // const mainLang = await fetchMainLanguage(userName, repoName);
    // console.log(mainLang)
    // return mainLang
}

main("qulacs")

module.exports = { 
    main: main
  };

 
