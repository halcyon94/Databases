'use strict';
(require('rootpath')());

var async = require('async'); 
var Schedule = require('models/Schedule');
var Employees = require('models/Employees');

function getAllHours(req, res, next) {
  async.waterfall(
  [
    function(callback) {
      Schedule.selectAll(callback);
    },
    function(listOfSched, callback) {
      async.map(listOfSched, function(sched, callback) {
        Employees.selectById(sched.eid, callback);
      }, function(err, employees) {
        callback(err, listOfSched, employees);
      });
    }
  ],
  function(err, listOfSched, employees) {
    err ? next(err) : res.send({
      listOfSched: listOfSched,
      employees: employees
    });
    console.log(listOfSched);
    console.log(employees);
  });
  Schedule.selectAll(function(err, results) {
    if (err) { return next(err); }
    res.json(results);
  });
}

function insertHour(req, res, next) {
  if (!req.body.hasOwnProperty('day') ||
      !req.body.hasOwnProperty('time') || 
      !req.body.hasOwnProperty('eid')) {
    return next(new Error('missing some fields'));
  }
  console.log("HI!")
  console.log(req.body.day);
  console.log(req.body.time);
  console.log(req.body.eid);
  Schedule.insert({
    day: req.body.day,
    time: req.body.time,
    eid: req.body.eid
  }, function(err, eid) {
    err ? next(err) : res.send(200, {eid: eid});
  });
}

function updateHour(req, res, next) {
  if (!req.body.hasOwnProperty('day') ||
      !req.body.hasOwnProperty('time') || 
      !req.body.hasOwnProperty('eid')) {
    return next(new Error('missing some fields'));
  }
  var hour = [
    req.body.day,
    req.body.time,
    req.body.eid,
  ];
  Schedule.update(hour, function(err) {
    err ? next(err) : res.sendStatus(200);
  });
}

function deleteHour(req, res, next) {
  if(!req.params.hasOwnProperty('eid')) {
    return next(new Error('no specified id!'));
  }
  var eid = parseInt(req.params.eid,10);
  Schedule.deleteById(eid, function(err) {
    err ? next(err) : res.send(200);
  });
}
exports.getAllHours = getAllHours;
exports.insertHour = insertHour;
exports.updateHour = updateHour;
exports.deleteHour = deleteHour;