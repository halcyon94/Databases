'use strict';
(require('rootpath')());

var Schedule = require('models/Schedule');

function getAllHours(req, res, next) {
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