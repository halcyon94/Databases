var app = angular.module('controllers.calendar', ['ui.calendar', 'ui.bootstrap']);

function calCtrl($scope,$compile,$http,uiCalendarConfig) {
    $scope.name = [];
    console.log($scope.title);
    console.log($scope.started);
    $scope.events = [];
    $scope.eventsF = function () {
      $http.get('/calendar')
      .success(function(data) {
        console.log(data);
        eidHash = {};
        for (var i = 0; i < data.employees.length; ++i) {
          eidHash[data.employees[i].eid] = data.employees[i];
          eidHash[data.employees[i].eid].schedule = []; //initialize sched field
        }
        for (var i = 0; i < data.listOfSched.length; ++i) {
          eidHash[data.listOfSched[i].eid].schedule.push(data.listOfSched[i]);
        }
      //for(var i=0;i<data.length;i++){
          //console.log(data.employees);
          //console.log(data.listOfSched);

      /*
        var res = (data[i].day).substring(0,10);
        var date = new Date(res);
        month = date.getMonth();
        year = date.getFullYear();
        day = date.getDate();
        hour = data[i].time.substring(0,2);
        hourtwo = parseInt(hour) +1;

            $scope.name[i] = dat.lastname +" "+ dat.firstname;
            console.log($scope.name[i]);
            $scope.events[i] = {title: $scope.name[i],
                            start: new Date(year,month,day,hour,00), 
                            end:   new Date(year,month,day,hourtwo.toString(),00)
                          };*/

          //}
        
        
      });
      //console.log($scope.events);
    };

    
    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
    };
    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
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

      var time = new Date($scope.year,$scope.month-1,$scope.day,$scope.hour,00);
      endhour2 = parseInt($scope.hour) +1;
      var endtime = new Date($scope.year,$scope.month-1,$scope.day,endhour2.toString(),00);
      console.log(time);
      console.log(endtime);
      $scope.events.push({
        title: $scope.title,
        start: time,
        end:   endtime
      });
      $http.post('/calendar', {
        eid: $scope.eid,
        time: $scope.hour,
        day: $scope.year+ "-"+($scope.month)+"-"+$scope.day,
      }).success(function() {

      });
//      $http.post('/calendar/' +$scope.eid+ '/'+ $scope.hour+'/' + $scope.year+'-'+$scope.month + '-' + $scope.day)
  //      .success();

      
    };
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
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
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };
    /* event sources array*/
    $scope.eventSources = [$scope.eventsF, $scope.events];
    console.log($scope.events);
}

app.controller("calCtrl", ["$scope", "$compile","$http", "uiCalendarConfig", calCtrl]);