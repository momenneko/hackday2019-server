const fetch = require("node-fetch");
require('dotenv').config();

// authorization
var options = {
    'headers': {
        'Authorization': process.env.GIT_AUTH
    }
};

// get repositories
async function fetchFirstRepo(userName){ // e.g. "octocat"
    fetch(`https://api.github.com/users/${userName}/repos`, options)
        .then(response => {
            console.log(response.status); // => 200
            response.json().then(userInfo => {
            // console.log(userInfo[0].full_name)
            return userInfo[0].full_name // 1番目のみ取得
        });
    });
}

// get languages
async function fetchMainLanguage(userName, repoName){ // e.g. "octocat", "Hello-World"
    fetch(`https://api.github.com/repos/${userName}/${repoName}/languages`, options)
        .then(response => {
            console.log(response.status); // => 200
                response.json().then(repoInfo => {
                // console.log(Object.keys(repoInfo)[0])
                return Object.keys(repoInfo)[0] // 1番目だけ取得
        });
    });
}

async function main(userName){
    const repoName = fetchFirstRepo(userName);
    const mainLang = fetchMainLanguage(userName, repoName);
    return 
}

main("qulacs")

module.exports = { 
    main: main
  };

 
