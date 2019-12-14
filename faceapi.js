let rp = require('request-promise');
require('dotenv').config();

// face API settings
const subscriptionKey = process.env.SUBSCRIPTION_KEY;
const defaultFaceListId = 'hackday2019';

async function registerFace(img_b64) {
    var options = {
        method: 'POST',
        uri: 'https://' + process.env.FACEAPI_END_POINT + `.com/face/v1.0/facelists/hackday2019/persistedfaces`,
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
        let faceId = parsedBody.persistedFaceId
        console.log('JSON Response')
        console.log(parsedBody)
        console.log(faceId)
        return faceId;
    } catch (err) {
        console.log(err)
        return;
    }
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
        if (parsedBody == null) {
            throw new Error('face cannot be deteced');
        }

        console.log('JSON Response')
        console.log(parsedBody.faceId)
        console.log('detect face')
        
        console.log(`faceId: ${faceId}`)
        
        return faceId;
    } catch (err) {
        console.log('detect----')
        console.log(err)
        return;
    }    
}

// faceidからpersonidを取得
async function findFromFaceList(faceId, faceListId = defaultFaceListId) {
    console.log(faceId, faceListId);
    if (faceId == null ) {
        console.log('faceId is null');
    }
    const body = 
        JSON.stringify({
            faceId: faceId,
            faceListId: faceListId,
            // maxNumOfCandidatesReturned: 10,
            mode: "matchFace" // 似ている人を探す
        });

    const options = {
        method: 'POST',
        uri: 'https://' + process.env.FACEAPI_END_POINT + '.com/face/v1.0/findsimilars',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key' : subscriptionKey
        },
        body: body
    };
    
    // 同期処理にするためにawait
    try {    
        let body = await rp(options)
        let parsedBody = JSON.parse(body)

        if (parsedBody == null) {
            throw new Error('face is not registered');
        }
        
        let persistedFaceId = parsedBody[0].persistedFaceId
        
        console.log('JSON Response')
        console.log(parsedBody)
        
        return persistedFaceId;
    } catch (err) {
        console.log('find error----')
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
   find: findFromFaceList,
   createPersonGroup: createPersonGroup
};
