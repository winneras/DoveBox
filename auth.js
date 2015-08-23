var OAuth = require('oauth');
var twOauth, twOauthCallback, nwGui;
var initTwOauth = function(params) {
    if (!twOauth) {
        twOauth = new OAuth.OAuth(
            "https://api.twitter.com/oauth/request_token",
            "https://api.twitter.com/oauth/access_token",
            params.consumer_key,
            params.consumer_secret,
            "1.0A",
            "oob",
            "HMAC-SHA1"
        );
    }
};
var twOauthRequestTokenHandler = function(error, oauth_token, oauth_token_secret, results) {
    var twPinWin, oauthUrl, twPin, getPinHandle;
    if (error) {
        console.log(error);
        res.send("yeah no. didn't work.")
    } else {
        console.log('oauth.token: ' + oauth_token);
        console.log('oauth.token_secret: ' + oauth_token_secret);
        oauthUrl = 'https://twitter.com/oauth/authenticate?oauth_token=' + oauth_token
            //document.getElementById('keys').innerHTML = 'oauth.token: ' + oauth_token + '<br>oauth.token_secret: ' + oauth_token_secret;
        twPinWin = newWindow(oauthUrl);
        getPinHandle = window.setInterval(function() {
            console.log(twPinWin);
            twPin = twPinWin.window.document.getElementsByTagName("code");
            if (twPin.length === 1) {
                window.clearInterval(getPinHandle);
                twPin = twPin[0].innerHTML;
                console.log(twPin);
                getAccessToken(oauth_token, oauth_token_secret, twPin);
                twPinWin.close();
            }
        }, 2000);
    }
};
var accessTokenHandler = function(error, accessToken, accessTokenSecret, results) {
    if (error) {
        console.log(error);
        res.send("yeah no. didn't work.")
    } else {
        if (twOauthCallback) {
            twOauthCallback(accessToken, accessTokenSecret);
        }
    }
};
var getAccessToken = function(token, secret, pin) {
    initTwOauth();
    twOauth.getOAuthAccessToken(token, secret, pin, accessTokenHandler);
};
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
    tmpWin = nwGui.Window.open(url, params);
    return tmpWin;
};
module.exports = {
    twAuth: function(params, gui, callback) {
        initTwOauth(params);
        nwGui = gui;
        twOauth.getOAuthRequestToken(twOauthRequestTokenHandler);
        if (callback) {
            twOauthCallback = callback;
        }
    }
};
console.log("auth.js");
