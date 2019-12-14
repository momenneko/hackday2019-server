'use strict';
const fetch = require("node-fetch");
require('dotenv').config();

// authorization
var options = {
    'headers': {
        // NOTE: Add token to .env, or get 403 error! 
        'Authorization': process.env.GIT_AUTH
    }
};

async function fetchRepositories(userName){ // e.g. "octocat"
    try {
        const url = `https://api.github.com/users/${userName}/repos`;
        const response = await fetch(url, options);
        const json = await response.json();
        var repositories = []
        for(var i=0; i<json.length; i++){ 
            repositories.push(json[i].name);
        }
        return repositories
    } catch (error) {
        console.log(error);
    }
}

// get languages
async function fetchLanguages(userName, repoName){ // e.g. "octocat", "Hello-World"
    try {
        const url = `https://api.github.com/repos/${userName}/${repoName}/languages`;
        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

async function aggregateLanguageInformation(userName, repositories){
    var allLanguages = {}
    // 集計
    for(var i=0; i<repositories.length; i++){
        const languagesInRepository = await fetchLanguages(userName, repositories[i]);
        for(var key in languagesInRepository){
            if (allLanguages[key]){
                allLanguages[key] += languagesInRepository[key];
            } else {
                allLanguages[key] = languagesInRepository[key];
            }
        }
    }
    // 詰め替え
    var languageArray = [];
    for(var key in allLanguages){
        languageArray.push({
            "name": key, "value": allLanguages[key]
        })
    }
    languageArray.sort(function(a,b){
        return b.value - a.value;
    })
    return languageArray
}

async function githubMain(userName){
    const repositories = await fetchRepositories(userName);
    const languageArray = await aggregateLanguageInformation(userName, repositories);
    // console.log(languageArray)
    return languageArray
}

module.exports = { 
    githubMain: githubMain
  };

 
