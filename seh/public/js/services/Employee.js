//product.js
var employee = angular.module('services.employee', ['ngResource']);

//--------------------
employee.filter('paging', ["SharedObject", function(SharedObject) {
  return function(input, pSize) {
    SharedObject.recordsCount = (input && input.length) ? input.length : 0;
    if(input){
      var size = parseInt(pSize, 10),
        pageNum = SharedObject.pageNum;
      if (input.length <= size)
        return input;
      var items = [];
      for (var i = 0; i < input.length; i++) {
        if (i < size * (pageNum - 1)) continue;
        if (i >= size * (pageNum - 1) + size) break;
        else items.push(input[i]);
      }
      return items;
    } else return null;
  }
}]);

//--------------------
employee.factory("SharedObject", function() {
  return {
    recordsCount: 0,
    editItemNumber: 0,
    pageNum: 1,
    insertMode: false,
    reset: function() {
      //this.recordsCount=0;
      this.editItemNumber = 0;
      this.pageNum = 1;
      this.insertMode = false;
    }
  };
});
employee.factory("HelperService", function() {
  return {
    GetErrorMessage: function(errObj){
      //console.log(errObj);
      if(errObj.status === 0)
        return "Error: unable to connect with server.";
      else if(errObj.data != "")
        return errObj.data;
      else{
        if(window.console)
          console.log(errObj);
        return "Error occured, check console for details.";
      }
    },
    RemoveItem: function(allItems, removeItem) {
      angular.forEach(allItems, function(item, i) {
        if (angular.equals(item, removeItem))
          allItems.splice(i, 1);
      });
    }
  };
});

employee.factory('Employee', ['$resource', function($resource) {
  return $resource('/employees/:id', null,
  {
    'update': { method:'PUT' }
  });
}]);
