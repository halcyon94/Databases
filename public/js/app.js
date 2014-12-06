'use strict';
/*global angular*/

var app = angular.module('yourApplicationName', [
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'http-auth-interceptor',
  'ui.bootstrap',
  'controllers.dataGrid'
]);

function configApp($routeProvider, $locationProvider) {
  $routeProvider
    .when('/employeesList', {
      templateUrl: 'partials/dataGrid.html',
      controller: 'dataGridCtrl'
    })
    .when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'homeCtrl'
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

app.run(function ($rootScope, $location) {
  //watching the value of the currentUser variable.
  /*$rootScope.$watch('currentUser', function(currentUser) {
    // if no currentUser and on a page that requires authorization 
    // then try to update it
    // will trigger http 401 if user does not have a valid session
    if (!currentUser && 
      (['/','/login','/logout'].indexOf($location.path()) === -1)) {
      Auth.currentUser();
    }
  });

  // On catching 401 errors, redirect to the login page.
  $rootScope.$on('event:auth-loginRequired', function() {
    $location.path('/login');
    return false;
  });*/
});