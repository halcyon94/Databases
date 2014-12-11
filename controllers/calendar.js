'use strict';
(require('rootpath')());

var async = require('async'); 
var Schedule = require('models/Schedule');
var Employees = require('models/Employees');

function getAllHours(req, res, next) {
  async.parallel(
  [
    function(callback) {
      Employees.selectAll(function(err, result) {
        result = result.map(function(employeee) {
          return {
            eid: employeee.eid,
            firstname: employeee.firstname,
            lastname: employeee.lastname
          };
        });
        callback(err, result);
      });
    },
    function(callback) {
      Schedule.selectAll(function(err, result) {
        callback(err, result);
      });
    }
  ],
  function(err, results) {
    err ? next(err) : res.send({
      employee: results[0],
      listOfSched: results[1]
    });
  });
}

function insertHour(req, res, next) {
  var eid = parseInt(req.body.eid);
  console.log(req.body.eid);
  console.log(req.body.day);
  console.log(req.body.time);
  if (!req.body.hasOwnProperty('day') ||
      !req.body.hasOwnProperty('time') || 
      (eid !== 0 && !eid)) {
    return next(new Error('missing some fields'));
  }
  Schedule.insert(req.body.day, req.body.time, eid, function(err, eid) {
    err ? next(err) : res.sendStatus(200);
  });
}

function updateHour(req, res, next) {
  var eid = parseInt(req.body.eid);
  if (!req.body.hasOwnProperty('day') ||
      !req.body.hasOwnProperty('time') || 
      (eid !== 0 && !eid)) {
    return next(new Error('missing some fields'));
  }
  Schedule.update(req.body.day, req.body.time, eid, function(err) {
    err ? next(err) : res.sendStatus(200);
  });
}

function deleteHour(req, res, next) {
  var eid = parseInt(req.params.eid);
  console.log(req.params.eid);
  console.log(req.params.day);
  console.log(req.params.time);
  if (!req.params.hasOwnProperty('day') ||
      !req.params.hasOwnProperty('time') || 
      (eid !== 0 && !eid)) {
    return next(new Error('missing some fields'));
  }
  Schedule.deleteSchedule(req.params.day,req.params.time, eid, function(err) {
    err ? next(err) : res.sendStatus(200);
  });
}
exports.getAllHours = getAllHours;
exports.insertHour = insertHour;
exports.updateHour = updateHour;
exports.deleteHour = deleteHour;