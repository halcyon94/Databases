'use strict';
var multiline = require('multiline');
var connection = require('config/db');
var async = require('async');

/**
 * [selectAll description]
 * @param  {Function} callback [description]
 * args: err, array of employees
 */
function selectAll(callback) {
  connection.query('SELECT * from PayEarned', callback);
}

/**
 * [selectById description]
 * @param  {[type]}   eid       [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function selectById(eid, callback) {
  connection.query('SELECT * FROM PayEarned WHERE eid = ?', [eid], function(err, result) {
    if (err) {return callback(err); }
    if (!result) { return callback(new Error('No existing user')); }
    callback(null, result);
  });
}

/**
 * [insert description]
 * @param  {object}   employee
 * employee object contains fields:
 * payperiod, eid, hoursworked, salary
 * @param  {Function} callback [description]
 * args: err
 */
var insertPayQuery = 'INSERT INTO PayEarned (payperiod, eid, hoursworked, salary) values (?, ?, ?, ?)';
function insert(employee, callback) {
  var payperiod = employee.payperiod;
  var eid = employee.eid;
  var hoursworked = employee.hoursworked;
  var salary = employee.salary;

  connection.query(insertPayQuery, [payperiod, eid, hoursworked, salary], function(err) {
    err ? callback(err) : callback(null);
  });
}

var getPayQuery = multiline(function() {/*
 select h.eid, r.rate, h.hours, h.hours*r.rate 
 as weeksalaray from 
 (select s.eid, count(*) as hours from (select * from Schedule where day > '?' and day < '?') as s, 
 (select * from HourLog where day > '?' and day < '?') as h 
 where hour(s.time) = hour(h.time) AND s.eid = h.eid group by s.eid) as h, 
 (select a.eid, a.rate from 
 (select e.eid, p.rate from Employees e, WorksAs w, Position p where 
 e.eid = w.eid AND w.pid = p.pid and w.end IS NULL) as a) as r where h.eid = r.eid';
*/});
function getPay(payperiod1, payperiod2, callback) {
  async.waterfall(
  [
    function(callback) {
      connection.query(
        getPayQuery,
        [payperiod1, payperiod2, payperiod1, payperiod2],
        function(err, results) {
          if (err) {return callback(err); }
          callback(results);
        });
    },
    function(employees, callback) {
      async.each(employees, insert, callback);
    }
  ],
  function(err) {
    err ? callback(err) : callback(null);
  });

}

var getPayQuery2 = multiline(function() {/*
select h.eid, r.rate, h.hours, h.hours*r.rate as weeksalaray 
from (select s.eid, count(*) as hours from (select * from Schedule where month(day) = month(current_date()) ) as s, 
(select * from HourLog where month(day) = month(current_date()) ) as h 
where hour(s.time) = hour(h.time) AND s.eid = h.eid group by s.eid) as h, 
(select a.eid, a.rate from 
(select e.eid, p.rate from Employees e, WorksAs w, Position p 
where e.eid = w.eid AND w.pid = p.pid AND w.end IS NULL) as a) as r where h.eid = r.eid;
*/});

function getPay2(callback) {
  async.waterfall(
  [
    function(callback) {
      connection.query(
        getPayQuery2,
        [],
        function(err, results) {
          if (err) {return callback(err); }
          callback(results);
        });
    },
    function(employees, callback) {
      async.each(employees, insert, callback);
    }
  ],
  function(err) {
    err ? callback(err) : callback(null);
  });

}

exports.selectAll = selectAll;
exports.selectById = selectById;
exports.getPay = getPay;
exports.getPay2 = getPay2;
exports.insert = insert;
