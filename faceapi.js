let rp = require('request-promise');
require('dotenv').config();

// face API settings
const subscriptionKey = process.env.SUBSCRIPTION_KEY;
const personGroupId = 'hackday2019';

async function registerFace(img_b64) {
    let faceId = detectFace(img_b64);
}

// 使わない, not yet
function createPersonGroup(group_name) { 
    let body = JSON.parse({"name": group_name}); 
    let personGroupId = group_name + Date.now;
    console.log(personGroupId);

    const options = {
        method: 'PUT',
        uri: 'https://' + process.env.FACEAPI_END_POINT + `.com/face/v1.0/persongroups/${personGroupId}`,
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key' : subscriptionKey
        }
    };
}

// base64の画像からpersonIdを取得
async function detectFace(img_b64) {
    const options = {
        method: 'POST',
        uri: 'https://' + process.env.FACEAPI_END_POINT + '.com/face/v1.0/detect',
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

        let faceId = parsedBody[0] ? parsedBody[0].faceId : null
        
        console.log('JSON Response')
        console.log(parsedBody)
        
        let personId = await identityFace([faceId], personGroupId) 
        console.log(`faceId: ${faceId}`)
        console.log(personId);
        
        return personId;
    } catch (err) {
        console.log(err)
        return;
    }    
}

// faceidからpersonidを取得
async function identityFace(faceIds, personGroupId) { 
    const body = JSON.parse(
        {
            "personGroupId": personGroupId,
            "faceIds": faceIds,
            // "maxNumOfCandidatesReturned": 1,
            // "confidenceThreshold": 0.5
        }
    );
    console.log(body);
    const options = {
        method: 'POST',
        uri: 'https://' + process.env.FACEAPI_END_POINT + '.com/face/v1.0/identify',
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key' : subscriptionKey
        }
    };
    
    // 同期処理にするためにawait
    try {    
        let body = await rp(options)
        let parsedBody = JSON.parse(body)

        if (parsedBody == null) {
            throw new Error('face is not registered');
        }
        
        let personId = parsedBody[0].candidates[0].personId

        console.log('JSON Response')
        console.log(parsedBody)
        
        return personId;
    } catch (err) {
        console.log(err)
        return;
    }    
}

let foo = () => {
    return 1;
}

module.exports={
   foo: foo,
   registerFace: registerFace,
   detectFace: detectFace,
   createPersonGroup: createPersonGroup
};
