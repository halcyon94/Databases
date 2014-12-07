'use strict';

var login = angular.module('controllers.login', []);

function loginCtrl($scope, $location, $http, $rootScope) {
  if ($rootScope.currentUser) {
    $location.path('/myhome');
  }
  $scope.login = function() {
    $http.post('/user', {
      login: $scope.user.login,
      password: $scope.user.password
    })
    .success(function(user) {
      $rootScope.currentUser = user; 
      $location.path('/myhome');
    })
    .error(function(err) {
      $scope.error = err.data;
    });
  };
  
}

//Auth from services.auth
login.controller('LoginCtrl', [
  '$scope',
  '$location',
  '$http',
  '$rootScope',
  loginCtrl]);