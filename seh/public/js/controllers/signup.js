'use strict';

var signup = angular.module('controllers.signup', ['services.auth']);

function signupCtrl($scope, $location, Auth) {
  $scope.register = function() {
    Auth.createUser({
      email: $scope.user.email,
      password: $scope.user.password  
    }, function(err) {
      if (err) {
        $scope.error = err;
      } else {
        $location.path('/');
      }
    });
  }
}

signup.controller('SignupCtrl', [
  '$scope',
  '$location',
  'Auth',
  signupCtrl]);