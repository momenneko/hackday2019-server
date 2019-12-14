let rp = require('request-promise');

// face API settings
const subscriptionKey = process.env.SUBSCRIPTION_KEY;
const uriBase = 'https://' + process.env.END_POINT + '.com/face/v1.0/detect';

async function registerFace(img_b64) {
    var options = {
        method: 'POST',
        uri: uriBase,
        body: img_b64, // 生のbinaryを直接送る
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key' : subscriptionKey
        }
    };
    
    // 同期処理にするためにawait
    try {    
        let body = await rp(options)
        let parsedBody = JSON.parse(body)
        let faceId = parsedBody[0].faceId
        
        console.log('JSON Response')
        console.log(parsedBody)
        console.log(faceId)

        return faceId;
    } catch (err) {
        console.log(err)
        return;
    }
}

let foo = () => {
    return 1;
}

function diag(x, y) {
    return sqrt(square(x) + square(y));
}

module.exports={
   foo: foo,
   registerFace: registerFace,
   diag: diag
};

// module.exports.registerFace = registerFace