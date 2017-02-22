You have to create a config.js file in the TwitterInterface folder in order to get the app running. 

The authentication looks like this:

var accessKeys = {
  consumer_key: 'xxx',
  consumer_secret: 'xxx',
  access_token: 'xxx',
  access_token_secret: 'xxx',
  timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
};

module.exports = accessKeys; 



