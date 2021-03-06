let rp = require('request-promise');
require('dotenv').config();

// face API settings
const subscriptionKey = process.env.SUBSCRIPTION_KEY;
const defaultFaceListId = process.env.DEVELOP_FACELIST_ID;

async function registerFace(img_b64, faceListId = defaultFaceListId) {
    var options = {
        method: 'POST',
        uri: 'https://' + process.env.FACEAPI_END_POINT + `.com/face/v1.0/facelists/${faceListId}/persistedfaces`,
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
        throw err;
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

        if (parsedBody == null || parsedBody.length === 0) {
            throw new Error('face cannot be deteced');
        }
        
        console.log('DETECT FACE : JSON Response')
        console.log(parsedBody)
        
        let faceId = parsedBody[0].faceId
        console.log(`faceId: ${faceId}`)
        
        return faceId;
    } catch (err) {
        console.log('detect error----')
        console.log(err)
        throw err;
    }    
}

// faceidからpersistFaceIdを取得
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
        throw err;
    }
}

module.exports={
   registerFace: registerFace,
   detectFace: detectFace,
   find: findFromFaceList,
   createPersonGroup: createPersonGroup
};
