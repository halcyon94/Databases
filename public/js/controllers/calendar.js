var app = angular.module('controllers.calendar', [/*'services.Hourserv',*/'ui.calendar', 'ui.bootstrap']);

function calCtrl($scope,$compile,$http,uiCalendarConfig) {
    $scope.name = [];
    $scope.events = [];
    $scope.eventsF = function () {
      $http.get('/calendar')
      .success(function(data) {
             
        for(var i=0;i<data.listOfSched.length;i++){
          var res = (data.listOfSched[i].day).substring(0,10);
          var date = new Date(res);
          month = date.getMonth();
          year = date.getFullYear();
          day = date.getDate()+1;
          hour = data.listOfSched[i].time.substring(0,2);
          hourtwo = parseInt(hour) +1;
          for(var j=0;j<data.employee.length;j++){
            if(data.employee[j].eid == data.listOfSched[i].eid)
              $scope.name[i] = data.employee[j].eid +" "+ data.employee[j].lastname +" "+ data.employee[j].firstname;
          }
          $scope.events[i] = {title: $scope.name[i],
                              start: new Date(year,month,day,hour), 
                              end:   new Date(year,month,day,hourtwo.toString())
                            };
        }
      });
    };

    
    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked. starts on '+new Date(date.start));
        var res = date.title.split(" ",3);
        $scope.eid = res[0];
        $scope.title = res[1]+" "+res[2];
        var date_r = new Date(date.start);
        $scope.month = date_r.getMonth()+1;
        $scope.year = date_r.getFullYear();
        $scope.day = date_r.getDate();
        $scope.hour = date_r.getHours();

    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
    /* add custom event*/
    $scope.addEvent = function() {

      var time = new Date($scope.year,$scope.month-1,$scope.day,$scope.hour);
      endhour2 = parseInt($scope.hour) +1;
      var endtime = new Date($scope.year,$scope.month-1,$scope.day,endhour2.toString());
      $http.post('/calendar', {
        eid: $scope.eid,
        time: ($scope.hour).toString()+":00:00",
        day: $scope.year+ "-"+($scope.month)+"-"+(parseInt($scope.day)).toString()
      }).success(function() {
        
          $scope.events.push({
        title: $scope.eid+" "+$scope.title,
        start: time,
        end:   endtime
        });

      });
//      $http.post('/calendar/' +$scope.eid+ '/'+ $scope.hour+'/' + $scope.year+'-'+$scope.month + '-' + $scope.day)
  //      .success();

      
    };
    /* remove event */
    $scope.remove = function() {
      //$scope.events.splice(index,1);
      var time = new Date($scope.year,$scope.month,$scope.day,$scope.hour);
      endhour2 = parseInt($scope.hour) +1;
      var endtime = new Date($scope.year,$scope.month,$scope.day,endhour2.toString());

      console.log($scope.eid);
      console.log(($scope.hour).toString()+":00:00");
      console.log($scope.year+ "-"+($scope.month)+"-"+($scope.day+1));

      $http.delete('/calendar', {
        eid: $scope.eid,
        time: ($scope.hour).toString()+":00:00",
        day: $scope.year+ "-"+($scope.month)+"-"+($scope.day+1)
      }).success(function() {
        console.log("successful delete");
        });
     /*   Hourserv.delete({ 
          eid: $scope.eid,
          time: ($scope.hour).toString()+":00:00",
          day: $scope.year+ "-"+($scope.month)+"-"+($scope.day+1)
          },
          {},
          function(val, resHdr) { //success
            console.log("success");
          //$notification.success('', "Delete success!");
          },
          function(httpRes) { //error
          console.log("error");
          //$notification.error('Delete Failed', msg);
          }
        );*/

    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };
     /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) { 
        element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 800,
        width:800,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventRender: $scope.eventRender
      }
    };
    /* event sources array*/
    $scope.eventSources = [$scope.eventsF, $scope.events];
}

app.controller("calCtrl", ["$scope", "$compile","$http","uiCalendarConfig", calCtrl]);