var hourserv = angular.module('services.hourserv', ['ngResource']);

hourserv.factory('Hourserv', ['$resource', function($resource) {
  return $resource('/calendar/:eid/:time/:day', null,
  {
    'delete': { method:'DELETE' }
  });
}]);
