
var twitter = require('twitter');
require('dotenv').config();

async function getTwitterProfile(username) { 
    // 認証情報を設定（Twitter Appで発行したものを設定）
    const client = new twitter({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token_key: process.env.ACCESS_TOKEN_KEY,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    })

    var params = {screen_name: username, count:3};
    let info = await client.get('statuses/user_timeline', params, function(error, tweets, response){
        if (error) {
            console.log(error);
            return null;
        }
        var result = {
            name : tweets[1].user.name,
            profile : tweets[1].user.description,
            follow : tweets[1].user.friends_count,
            Follower : tweets[1].user.followers_count
        }

        // TODO 本当はココでreturnして値を返したいが、同期処理の仕方が不明 prprmurakami
        // => 解決
        console.log(result);
        return result;
    });
    return info;
}

module.exports={
    getTwitterProfile: getTwitterProfile
 };
 