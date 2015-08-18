var gui = require('nw.gui'),
  OAuth = require('oauth'),
  gui = require('nw.gui');
var oauth = new OAuth.OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  "cY0UcnKfIW8dxtgSjsq6Q",
  "UXcIPAZjUt1Za8kVqlA8qLS61AbNmtOoNEiRHkQvO0",
  "1.0A",
  null,
  "HMAC-SHA1"
);
gui.Window.get().show();
oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
  if (error) {
    console.log(error);
    res.send("yeah no. didn't work.")
  } else {
    //req.session.oauth = {};
    //req.session.oauth.token = oauth_token;
    console.log('oauth.token: ' + oauth_token);
    //req.session.oauth.token_secret = oauth_token_secret;
    console.log('oauth.token_secret: ' + oauth_token_secret);
    //res.redirect('https://twitter.com/oauth/authenticate?oauth_token=' + oauth_token)
    document.getElementById('keys').innerHTML = 'oauth.token: ' + oauth_token + 'oauth.token_secret: ' + oauth_token_secret;
  }
});
