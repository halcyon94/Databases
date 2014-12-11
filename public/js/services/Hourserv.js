var Hourserv = angular.module('services.Hourserv', ['ngResource']);

Hourserv.factory('Hourserv', ['$resource', function($resource) {
  return $resource('/calendar/:eid/:day/:time', 
  	{eid:'@eid',
  	day:'@day',
  	time:'@time'},
  {
    delete: { method:'DELETE' }
  });
}]);
