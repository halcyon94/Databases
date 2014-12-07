'use strict';
(require('rootpath')());

var async = require('async');
var Employees = require('models/Employees');
var Security = require('models/Security');
var WorksAs = require('models/WorksAs');

function getAll(req, res, next) {
  Employees.selectAll(function(err, results) {
    if (err) { return next(err); }
    res.json(results);
  });
}

function getById(req, res, next) {
  if (!req.params.hasOwnProperty('eid')) {
    return next(new Error('no specified id!'));
  }
  var eid = parseInt(req.params.eid, 10);
  Employees.selectById(eid, function(err, result) {
    if (err) { return next(err); }
    res.json(result);
  });
}

function postEmployee(req, res, next) {
  if (!req.body.hasOwnProperty('lastname') ||
      !req.body.hasOwnProperty('firstname') || 
      !req.body.hasOwnProperty('email') || 
      !req.body.hasOwnProperty('date') || 
      !req.body.hasOwnProperty('phone')) {
    return next(new Error('missing some fields'));
  }
  var eid;
  async.waterfall(
  [
    function(callback) {
      Employees.insert({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
        dob: req.body.date,
        phone: req.body.phone
      }, function(err, retEid) {
        if (err) { return callback(err); }
        eid = retEid;
        callback(null);
      });
    },
    function(callback) {
      WorksAs.insert(eid, 1, callback); //default level of position is 1
    },
    function(callback) {
      Security.insert(req.body.lastname+eid, req.body.lastname, eid, callback);
    }
  ],
  function(err) {
    err ? next(err) : res.send(200, eid);
  });
 
}

function putEmployee(req, res, next) {
  if (!req.params.hasOwnProperty('eid') || 
      !req.body.hasOwnProperty('lastname') ||
      !req.body.hasOwnProperty('firstname') || 
      !req.body.hasOwnProperty('email') || 
      !req.body.hasOwnProperty('date') || 
      !req.body.hasOwnProperty('phone')) {
    return next(new Error('missing some fields'));
  }
  var employee = [
    req.body.lastname,
    req.body.firstname,
    req.body.email,
    req.body.date,
    req.body.phone,
    parseInt(req.params.eid,10)
  ];
  Employees.update(employee, function(err) {
    err ? next(err) : res.sendStatus(200);
  });
}

function deleteEmployee(req, res, next) {
  if(!req.params.hasOwnProperty('eid')) {
    return next(new Error('no specified id!'));
  }
  var eid = parseInt(req.params.eid,10);
  Employees.deleteById(eid, function(err) {
    err ? next(err) : res.sendStatus(200);
  });
}

exports.getAll = getAll;
exports.getById = getById;
exports.post = postEmployee;
exports.put = putEmployee;
exports.deleteById = deleteEmployee;