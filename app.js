var Twitter = require('twitter'),
  OAuth = require('oauth'),
  gui = require('nw.gui');
var twClient;
var twOauthParams = {
  consumer_key: "cY0UcnKfIW8dxtgSjsq6Q",
  consumer_secret: "UXcIPAZjUt1Za8kVqlA8qLS61AbNmtOoNEiRHkQvO0",
  access_token_key: "",
  access_token_secret: ""
}
var oauth = new OAuth.OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  twOauthParams.consumer_key,
  twOauthParams.consumer_secret,
  "1.0A",
  "oob",
  "HMAC-SHA1"
);
var newWindow = function(url, params) {
  var tmpWin;
  if (!url || url === "") {
    return null;
  }
  if (!params) {
    params = {
      toolbar: true,
      resizable: true,
      show: true,
      height: 500,
      width: 500
    }
  }
  tmpWin = gui.Window.open(url, params);
  return tmpWin;
};
var getTweets = function() {
  var params;
  console.log(twOauthParams);
  if (!twClient) {
    twClient = new Twitter(twOauthParams);
  }
  params = {
    screen_name: 'winneras' //need to use '', "" will not work
  };
  twClient.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);
    }
  });
};
var accessTokenHandler = function(error, accessToken, accessTokenSecret, results) {
  if (error) {
    console.log(error);
    res.send("yeah no. didn't work.")
  } else {
    twOauthParams.access_token_key = accessToken;
    twOauthParams.access_token_secret = accessTokenSecret;
  }
  getTweets();
};
var getAccessToken = function(token, secret, pin) {
  oauth.getOAuthAccessToken(token, secret, pin, accessTokenHandler);
};
var oauthRequestTokenHandler = function(error, oauth_token, oauth_token_secret, results) {
  var twPinWin, oauthUrl, twPin, getPinHandle;
  if (error) {
    console.log(error);
    res.send("yeah no. didn't work.")
  } else {
    console.log('oauth.token: ' + oauth_token);
    console.log('oauth.token_secret: ' + oauth_token_secret);
    oauthUrl = 'https://twitter.com/oauth/authenticate?oauth_token=' + oauth_token
    document.getElementById('keys').innerHTML = 'oauth.token: ' + oauth_token + '<br>oauth.token_secret: ' + oauth_token_secret;
    twPinWin = newWindow(oauthUrl);
    getPinHandle = window.setInterval(function() {
      console.log(twPinWin);
      twPin = twPinWin.window.document.getElementsByTagName("code");
      if (twPin.length === 1) {
        window.clearInterval(getPinHandle);
        twPin = twPin[0].innerHTML;
        console.log(twPin);
        getAccessToken(oauth_token, oauth_token_secret, twPin);
      }
    }, 2000);
  }
}


gui.Window.get().show();
oauth.getOAuthRequestToken(oauthRequestTokenHandler);
