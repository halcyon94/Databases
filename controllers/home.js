'use strict';
(require('rootpath')());

var async = require('async');
var Schedule = require('models/Schedule');
var PayEarned = require('models/PayEarned');
var HourLog = require('models/HourLog');

function submitWorkHour(req, res, next){
  console.log('inserted into hourLOg');
  console.log(req.user.eid);
  console.log(req.connection.remoteAddress);
  HourLog.insert(req.user.eid, req.connection.remoteAddress, function(err) {
    err ? next(err) : res.sendStatus(200);
  });
}

function get(req, res, next) {
  async.parallel(
  [
    function(callback) {
      Schedule.selectById(req.user.eid, callback);
    },
    function(callback) {
      PayEarned.selectById(req.user.eid, callback);
    },
    function(callback) {
      HourLog.selectById(req.user.eid, callback);
    }
  ],
  //results[0] is the schedule and results[1] is the payearned object
  function(err, results) {
    err ? next(err) : res.send({
      employee: req.user,
      schedule: results[0],
      payperiod: results[1],
      hours: results[2]
    });
  });
}

function show(req, res, next) {
  HourLog.selectAll(function(err, results) {
    if (err) { return next(err); }
    res.json(results);
  });
}


exports.get = get;
exports.show = show;
exports.submitWorkHour = submitWorkHour;

