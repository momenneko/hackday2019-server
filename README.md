# hackday2019-server

[Source code on client side(Android App)](https://github.com/akirago/hARo_scoutAR)

## Usage

1. add `.env` including:
 ```
# face API
SUBSCRIPTION_KEY={subscription key}
FACEAPI_END_POINT={end point(here in https://{here}.com/face/v1.0/)}

# facelist id for face API
PRODUCTION_FACELIST_ID={facelist id for production}
DEVELOP_FACELIST_ID={facelist id for develop}

# twitter API
CONSUMER_KEY={comsumer key}
CONSUMER_SECRET={comsumer secret key}
ACCESS_TOKEN_KEY={access token key}
ACCESS_TOKEN_SECRET={access token secret key}

# github API
GIT_AUTH={auth token}

 ```

2. `npm install`
3. `redis-server`
4. `node app`
