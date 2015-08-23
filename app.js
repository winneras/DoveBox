var gui = require('nw.gui');
var auth = require('./auth.js'),
    config = require('./config');
var doveBox = angular.module('doveBox', []);


var saveAccessToken = function(accessToken, accessTokenSecret) {
    console.log('access', accessToken, accessTokenSecret);
    localStorage.accessToken = accessToken;
    localStorage.accessTokenSecret = accessTokenSecret;
};
doveBox.controller('dboxCtrl', function($scope) {
    $scope.login = function() {
        auth.twAuth(config.twOauthParams, gui, saveAccessToken);
    };
    $scope.getTweets = function() {};
});

gui.Window.get().show();
