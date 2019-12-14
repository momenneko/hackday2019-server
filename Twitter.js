exports.getTwitterProfile = async function a(username) { 
    // twitterパッケージの読み込み
    var twitter = require('twitter');

    // 認証情報を設定（Twitter Appで発行したものを設定）
    var client = new twitter({
    consumer_key        : "XU8is3dIjiGOfVXhgN711aDwh",
    consumer_secret     : "y5iFgAJl7OL28OTt1TChHuPY9LaRgqLpDdOPCpiWfG0EE4lIEK",
    access_token_key    : "1201471226905890816-yyLS6c1zhlEQY6Lto1ypeenFxMS8o6",
    access_token_secret : "RPOHtAjc01ntND7DFz9v1hsR7cLtnZeblxRQiI9XeIkfP"
    });

    var params = {screen_name: username, count:3};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
        if (!error) {
            var result = {
                name : tweets[1].user.name,
                profile : tweets[1].user.description,
                follow : tweets[1].user.friends_count,
                Follower : tweets[1].user.followers_count
            }
            return result;
        }
    });
}


// // twitterパッケージの読み込み
// var twitter = require('twitter');

// // 認証情報を設定（Twitter Appで発行したものを設定）
// var client = new twitter({
// consumer_key        : "XU8is3dIjiGOfVXhgN711aDwh",
// consumer_secret     : "y5iFgAJl7OL28OTt1TChHuPY9LaRgqLpDdOPCpiWfG0EE4lIEK",
// access_token_key    : "1201471226905890816-yyLS6c1zhlEQY6Lto1ypeenFxMS8o6",
// access_token_secret : "RPOHtAjc01ntND7DFz9v1hsR7cLtnZeblxRQiI9XeIkfP"
// });

// var params = {screen_name: 'prprmurakami', count:3};
// client.get('statuses/user_timeline', params, function(error, tweets, response){
//     if (!error) {
//         console.log(tweets);
//       }
// });
