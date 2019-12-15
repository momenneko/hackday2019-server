var redis = require("redis");
const {promisify} = require('util');

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);


// 情報登録
async function register(faceId, name, twitterInfo, gitInfoList){
    client.on("error", function (err) {
        console.log("Error " + err);
    });
    
    client.set("name-" + faceId, name, redis.print);
    if (twitterInfo) {
        client.set("twitter-" + faceId, JSON.stringify(twitterInfo), redis.print);
    }
    if (gitInfoList) {
        client.set("git-" + faceId, JSON.stringify(gitInfoList), redis.print);
    }
}

// 情報取得    
async function get(faceId) {
    const name = await getAsync("name-" + faceId);
    const strTwitterInfo = await getAsync("twitter-" + faceId);
    const strGitInfo = await getAsync("git-" + faceId);

    var twitter_info = {};
    var github_info = {};

    // undefined対策
    if (strTwitterInfo != 'undefined') {
        twitter_info = JSON.parse(strTwitterInfo);
    }
    if (github_info != 'undefined') {
        github_info = {'language' : JSON.parse(strGitInfo)};
    }

    return {name, twitter_info, github_info};
}

module.exports={
    get: get,
    register: register
};