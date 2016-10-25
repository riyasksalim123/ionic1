angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicPopup,$mdDialog,$mdToast) {

  var app = new Clarifai.App(
    'gFf3cYi3k3RGSv1ZLYyapkpBk6yE1dkUAJojVgO1',
    'ljzfIY_Qe8qtQ4TnEN0mlxjwm3p8I_AKCyOo9lGf'
  );

 // alert(JSON.stringify(app));


  //app.models.predict(Clarifai.GENERAL_MODEL, "http://blog.pakistani.pk/file/2016/02/10-Famous-Cartoon-Characters-of-All-Time-Mickey-Mouse.png").then(
  //  function(response) {
  //
  //    alert(JSON.stringify(response));
  //    // do something with response
  //  },
  //  function(err) {
  //    alert(JSON.stringify(err));
  //    // there was an error
  //  }
  //);





  //https://developer-preview.clarifai.com/guide/
  //https://words.bighugelabs.com/getkey.php

  //https://words.bighugelabs.com/admin/2e861e57d24051262a1cf864d6ca24d6
  //Your API key is 2e861e57d24051262a1cf864d6ca24d6
  //eg : http://words.bighugelabs.com/api/2/2e861e57d24051262a1cf864d6ca24d6/forest/json

  //https://jsfiddle.net/onigetoc/kxz6L4m3/
  //https://newsapi.org/#documentation

  //flickr
  //http://jsfiddle.net/giulianobertoti/75hya/


  app.models.predict(Clarifai.TRAVEL_MODEL, "https://samples.clarifai.com/travel.jpg").then(
    function(response) {
      alert(response.data);
      // do something with response
    },
    function(err) {
      alert(JSON.stringify(err));
      // there was an error
    }
  );

//  // Require the client
//  var Clarifai = require('clarifai');
//
//// instantiate a new Clarifai app passing in your clientId and clientSecret
//  var app = new Clarifai.App(
//    'gFf3cYi3k3RGSv1ZLYyapkpBk6yE1dkUAJojVgO1',
//    'ljzfIY_Qe8qtQ4TnEN0mlxjwm3p8I_AKCyOo9lGf'
//  );
//  alert(app);

  var last = {
    bottom: false,
    top: true,
    left: false,
    right: true
  };

  $scope.toastPosition = angular.extend({},last);

  $scope.getToastPosition = function() {
    sanitizePosition();

    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  function sanitizePosition() {
    var current = $scope.toastPosition;

    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;

    last = angular.extend({},current);
  }

  $scope.gPlace;
  $scope.showPopup = function() {
    $scope.data = {};
    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<input type="password" ng-model="data.wifi">',
      title: 'Enter Wi-Fi Password',
      subTitle: 'Please use normal things',
      scope: $scope,
      buttons: [
        {text: 'Cancel'},
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function (e) {
            if (!$scope.data.wifi) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              return $scope.data.wifi;
            }
          }
        }
      ]
    });

  };

  $scope.status = '  ';
  $scope.customFullscreen = false;

  $scope.showAlert = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('This is an alert title')
        .textContent('You can specify some description text in here.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );



    var pinTo = $scope.getToastPosition();

    $mdToast.show(
      $mdToast.simple()
        .textContent('Simple Toast!')
        .position(pinTo )
        .hideDelay(3000)
    );


  };

  })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
