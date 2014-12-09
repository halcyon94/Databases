//manager.js
var app = angular.module('controllers.home', []); //access existing module

function managerCtrl($scope, $http, $location) {
  $scope.payperiod = [];
  $scope.schedule = [];
  $scope.employee = {};
  $http.get('/home')
    .success(function(data) {
      $scope.employee = data.employee;
      $scope.payperiod = data.payperiod;
      $scope.schedule = data.schedule;
    })
    .error(function(data) {
      console.log(data.data);
    });
  $scope.redirectToList = function() {
    $location.path('/list');
  }
}

app.controller("managerCtrl", ["$scope", "$http", "$location", managerCtrl]);
