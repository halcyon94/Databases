'use strict';
(require('rootpath')());

var Employees = require('models/Employees');

function getAll(req, res, next) {
  Employees.selectAll(function(err, results) {
    if (err) { return next(err); }
    res.json(results);
  });
}

function getById(req, res, next) {
  if (!req.body.hasOwnProperty('eid')) {
    return next(new Error('no specified id!'));
  }
  var eid = parseInt(req.params.eid, 10);
  Employees.selectById(eid, function(err, result) {
    if (err) { return next(err); }
    res.json(result);
  });
}

function postEmployee(req, res, next) {
  if (!req.body.hasOwnProperty('eid') || 
      !req.body.hasOwnProperty('lastname') ||
      !req.body.hasOwnProperty('firstname') || 
      !req.body.hasOwnProperty('email') || 
      !req.body.hasOwnProperty('date') || 
      !req.body.hasOwnProperty('phone')) {
    return next(new Error('missing some fields'));
  }
  Employees.insert({
    ID : req.body.eid,
    LastName: req.body.lastname,
    FirstName: req.body.firstname,
    Email: req.body.email,
    DOB: req.body.date,
    Phone: req.body.phone
  }, function(err) {
    err ? next(err) : res.sendStatus(200);
  });
}

function putEmployee(req, res, next) {
  if (!req.body.hasOwnProperty('eid') || 
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
  if(!req.body.hasOwnProperty('eid')) {
    return next(new Error('no specified id!'));
  }
  var eid = parseInt(req.params.eid,10);
  Employees.deleteById(eid, function(err) {
    err ? next(err) : res.send(200);
  });
}

exports.getAll = getAll;
exports.getById = getById;
exports.post = postEmployee;
exports.put = putEmployee;
exports.deleteById = deleteEmployee;