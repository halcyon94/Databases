//DataGrid.js
var app = angular.module('controllers.dataGrid', ['services.employee']); //access existing module

function dataGridCtrl($scope, SharedObject, HelperService, Employee) {
  //----------private members
  var fieldTypeMapping = {
    eid: 'int',
    lastname: 'string',
    firstname: 'string',
    email: 'string',
    dob: 'date',
    phone: 'string'
  };
  var validation = function(item) {
    var isValid = true;
    angular.forEach(item, function(val, key) {
      /*if (!HelperService.Validate(fieldTypeMapping[key], val.value)) {
        item[key].isError = true;
        isValid = false;
      }
      else
        item[key].isError = false;*/
    });
    return isValid;
  };

  var trimDateWithTimezone = function(items){
    //console.log(items[0]); //trim timezone, preserving date
    angular.forEach(items, function(ele, idx) {
      var date = new Date(ele.dob),
        month = date.getMonth()+1;
      month = ((month.toString().length===1) ? "0" : "")+month;
      ele['dob'] = date.getFullYear()+"-"+month+"-"+date.getDate();
    });
    return items;
  };

  var refresh = function(item) {
    Employee.query( null,
      function(items, resHdr) { //success
        $scope.items = trimDateWithTimezone(items);
        //$notification.success('', "Fetch success!");
        SharedObject.recordsCount = items.length;
      },
      function(httpRes) { //error
        var msg = HelperService.GetErrorMessage(httpRes);
        //$notification.error('Data Fetch Failed', msg);
      }
    );
  };

  //-----------scope properties
  $scope.searchProp = $scope.sort = 'eid';
  $scope.search = {};
  $scope.pageSize = 5;
  $scope.localObject = SharedObject;
  //updateItem = {'Name': {isError:false, value:'xyz'}, ...};
  $scope.updateItem = {}; //for edit & insert

  //-----------scope Data methods
  $scope.EditUpdate = function(item) {
    if ($scope.localObject.editItemNumber !== item.eid) {
      $scope.localObject.editItemNumber = item.eid;
      $scope.localObject.insertMode = false;
      $scope.updateItem = {};
      angular.forEach(item, function(val, key) {
        $scope.updateItem[key] = {
          value: val,
          isError: false
        };
      });
    } else {
      if (validation($scope.updateItem)) {
        var litem = $scope.updateItem;
        var record = {
              //id: parseInt(litem.eid.value, 10),
              lastname: litem.lastname.value,
              firstname: litem.firstname.value,
              email: litem.email.value,
              date: litem.dob.value,
              phone: litem.phone.value
            };
        Employee.update(
          { id: $scope.localObject.editItemNumber },
          record,
          function(val, resHdr) { //success
            angular.forEach($scope.updateItem, function(val, key) {
              item[key] = val.value;
            });
            //$notification.success('', "Update success!");
            $scope.updateItem = {};
            $scope.localObject.editItemNumber = 0;
          },
          function(httpRes) { //error
            var msg = HelperService.GetErrorMessage(httpRes);
            //$notification.error('Update Failed', msg);
            $scope.updateItem = {};
            $scope.localObject.editItemNumber = 0;
          }
        );
      }
    }
  };

  $scope.CancelDelete = function(item) {
    if ($scope.localObject.editItemNumber === item.eid) {
      $scope.localObject.editItemNumber = 0;
      $scope.updateItem = {};
    } else {
      //delete item;
      Employee.delete(
        { id: item.eid },
        {},
        function(val, resHdr) { //success
          HelperService.RemoveItem($scope.items, item);
          //$notification.success('', "Delete success!");
        },
        function(httpRes) { //error
          var msg = HelperService.GetErrorMessage(httpRes);
          //$notification.error('Delete Failed', msg);
        }
      );
    }
  };

  $scope.InsertRecord = function() {
    if ($scope.localObject.insertMode) {
      if (validation($scope.updateItem)) {
        var item = $scope.updateItem;
        var record = {
              eid: parseInt(item.eid.value, 10),
              lastname: item.lastname.value,
              firstname: item.firstname.value,
              email: item.email.value,
              dob: item.dob.value,
              phone: item.phone.value
            };
        Employee.save(
          null,
          {id: record.eid, lastname: record.lastname, firstname: record.firstname, email: record.email, phone: record.phone, date: record.dob},
          function(val, resHdr) {  //success
            $scope.items.push(record);
            //$notification.success('', "Insert success!");
          },
          function(httpRes) {  //error
            var msg = HelperService.GetErrorMessage(httpRes);
            //$notification.error('Insert Failed', msg);
          }
        );
        $scope.updateItem = {};
        $scope.localObject.insertMode = false;
      }
    } else {
      //show footer
      $scope.updateItem = {};
      angular.forEach(fieldTypeMapping, function(val, key) {
        $scope.updateItem[key] = {
          value: '',
          isError: false
        };
      });
      $scope.localObject.insertMode = true;
      $scope.localObject.editItemNumber = 0;
    }
  };

  //-------------scope Non-Data Methods
  $scope.TotalPages = function() {
    var size = parseInt($scope.pageSize, 10);
    if (size > $scope.localObject.recordsCount) return 1;
    else
      return $scope.localObject.recordsCount % size === 0 ?
        $scope.localObject.recordsCount / size :
        Math.floor($scope.localObject.recordsCount / size) + 1;
  };
  $scope.NavPrev = function() {
    var pageNum = $scope.localObject.pageNum;
    pageNum = pageNum < 2 ? 1 : pageNum - 1;
    $scope.localObject.reset();
    $scope.localObject.pageNum = pageNum;
  };
  $scope.NavNext = function() {
    var pageNum = $scope.localObject.pageNum;
    pageNum = $scope.localObject.recordsCount > ($scope.pageSize * pageNum) ? pageNum + 1 : pageNum;
    $scope.localObject.reset();
    $scope.localObject.pageNum = pageNum;
  };

  //-----------init Load
  refresh();
}

app.controller("dataGridCtrl", ["$scope", "SharedObject", "HelperService", "Employee", dataGridCtrl]);
