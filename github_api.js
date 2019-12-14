'use strict';
const fetch = require("node-fetch");
require('dotenv').config();

// authorization
var options = {
    'headers': {
        'Authorization': process.env.GIT_AUTH // NOTE: add token to .env, or get 403 error! 
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

async function githubMain(userName){
    const repositories = await fetchRepositories(userName);
    var languages = {}
    for(var i=0; i<repositories.length; i++){
        const languages = await fetchLanguages(userName, repositories[i]);
        console.log(i,repositories[i],languages)
    }
}

githubMain("qulacs")

module.exports = { 
    githubMain: githubMain
  };

 
