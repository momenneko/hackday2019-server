const fetch = require("node-fetch");
require('dotenv').config();

// authorization
var options = {
    'Authorization':  process.env.GIT_AUTH
};

// get repositories
function getFirstRepo(user_name){ // e.g. "octocat"
    fetch(`https://api.github.com/users/${user_name}/repos`, options)
        .then(response => {
            console.log(response.status); // => 200
                response.json().then(userInfo => {
                // console.log(userInfo[0].full_name)
                return userInfo[0].full_name // 1番目のみ取得?
        });
    });
}

// get languages
function getMainLanguage(user_name, repo_name){ // e.g. "octocat", "Hello-World"
    fetch(`https://api.github.com/repos/${user_name}/${repo_name}/languages`, options)
        .then(response => {
            console.log(response.status); // => 200
                response.json().then(repoInfo => {
                // console.log(Object.keys(repoInfo)[0])
                return Object.keys(repoInfo)[0] // 1番目だけ取得
        });
    });
}

console.log(getFirstRepo("qulacs"))
console.log(getMainLanguage("qulacs", "cirq-qulacs"))