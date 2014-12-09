'use strict';
/*global angular*/

var app = angular.module('yourApplicationName', [
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'http-auth-interceptor',
  'controllers.dataGrid',
  'controllers.home',
  'controllers.calendar'
]);

function configApp($routeProvider, $locationProvider) {
  $routeProvider
    .when('/list', {
      templateUrl: 'partials/dataGrid.html',
      controller: 'dataGridCtrl'
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginCtrl'
    })
    .when('/myhome', {
      templateUrl: 'partials/home.html',
      controller: 'homeCtrl'
    })
    .when('/mycalendar', {
      templateUrl: 'partials/calendar.html',
      controller: 'calCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
  $locationProvider.html5Mode(true);
}

app.config([
  '$routeProvider', 
  '$locationProvider', 
  configApp
]);

app.run(function ($rootScope, $location, $http) {
  //watching the value of the currentUser variable.
  $rootScope.$watch('currentUser', function(currentUser) {
    // if no currentUser and on a page that requires authorization 
    // then try to update it
    // will trigger http 401 if user does not have a valid session
    if (!currentUser && 
      (['/','/login','/logout'].indexOf($location.path()) === -1)) {
      $http.get('/user')
        .success(function(user) {
          $rootScope.currentUser = user;
        })
        .error(function() {
          $rootScope.currentUser = null;
        });
    }
  });

  // On catching 401 errors, redirect to the login page.
  $rootScope.$on('event:auth-loginRequired', function() {
    if (!$rootScope.currentUser) {
      $location.path('/login');
    }
    return false;
  });
});