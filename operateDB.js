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
    client.set("twitter-" + faceId, JSON.stringify(twitterInfo), redis.print);
    client.set("git-" + faceId, JSON.stringify(gitInfoList), redis.print)
    client.quit();
}

// 情報取得    
async function get(faceId) {
    const name = await getAsync("name-" + faceId);
    const strTwitterInfo = await getAsync("twitter-" + faceId);
    const strGitInfo = await getAsync("git-" + faceId);

    console.log('aaa')
    if (twitterInfo) {
        twitterInfo = JSON.parse(strTwitterInfo);
    }
    if (gitInfo) {
        gitInfo = JSON.parse(strGitInfo);
    }
    console.log('b')
    return {name, twitterInfo, gitInfo};
}

module.exports={
    get: get,
    register: register
};