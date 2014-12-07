'use strict';

var login = angular.module('controllers.login', []);

function loginCtrl($scope, $location, $http) {
  $scope.login = function() {
    $http.post({
      login: $scope.user.login,
      password: $scope.user.password
    })
    .success(function() {
      $location.path('/home')
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
  loginCtrl]);