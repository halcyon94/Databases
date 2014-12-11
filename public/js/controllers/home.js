//home.js
var app = angular.module('controllers.home', []); //access existing module

function homeCtrl($scope, $http, $location, $rootScope) {
  if (!$rootScope.currentUser) {
    $location.path('/login');
  }
  $scope.payperiod = [];
  $scope.schedule = [];
  $scope.employee = {};
  $scope.hours = [];
  $scope.numhours = 0;
  $http.get('/home')
    .success(function(data) {
      $scope.employee = data.employee;
      $scope.payperiod = data.payperiod;
      $scope.schedule = data.schedule;
      $scope.hours = data.hours;
      console.log($scope.payperiod);
      console.log($scope.hours);
      for(var i=0;i<($scope.schedule).length;i++){
        for(var j=0;j<($scope.hours).length;j++){
          if((($scope.schedule[i]).day==($scope.hours[j]).day) && (($scope.schedule[i]).time==($scope.hours[j]).time)){
            $scope.numhours++;
          }
        }
      }
      //$scope.payearned = data.payearned;
    })
    .error(function(data) {
      console.log(data.data);
    });
  $scope.submitWorkHour = function() {
  $http.post('/home')
    .success(function(){

      console.log("successful button click");
  });
  }
  $scope.redirectToList = function() {
    $location.path('/list');
  }
  $scope.redirectToCal = function() {
    $location.path('/mycalendar');
  }
}

app.controller("homeCtrl", ["$scope", "$http", "$location", "$rootScope", homeCtrl]);
