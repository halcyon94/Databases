'use strict';
(require('rootpath')());

var async = require('async');
var Schedule = require('models/Schedule');
var PayEarned = require('models/PayEarned');

function get(req, res, next) {
  var eid = req.user.eid;
  async.parallel(
  [
    function(callback) {
      Employees.selectById(eid, callback);
    },
    function(callback) {
      Schedule.selectById(eid, callback);
    },
    function(callback) {
      PayEarned.selectById(eid, callback);
    }
  ],
  //results[0] is the schedule and results[1] is the payearned object
  function(err, results) {
    err ? next(err) : res.send({
      employees: results[0]
      schedule: results[1],
      payperiod: results[2]
    });
  });
}

exports.get = get;