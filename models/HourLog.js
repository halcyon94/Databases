'use strict';
var connection = require('config/db');

/**
 * [selectAll description]
 * @param  {Function} callback [description]
 * args: err, array of employees
 */
function selectAll(callback) {
  connection.query('SELECT * from HourLog', callback);
}

/**
 * [selectById description]
 * @param  {[type]}   id       [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function selectById(eid, callback) {
  connection.query('SELECT * FROM HourLog WHERE eid = ?', [eid], function(err, result) {
    if (err) {return callback(err); }
    if (!result) { return callback(new Error('No existing user')); }
    callback(null, result);
  });
}

function selectByDay(day, callback) {
  connection.query('SELECT * FROM HourLog WHERE day = ?', [day], function(err, result) {
    if (err) {return callback(err); }
    if (!result[0]) { return callback(new Error('No existing user')); }
    callback(null, result[0]);
  });
}

/**
 * [insert description]
 * @param  {object}   HourLog
 * HourLog object contains fields:
 * day, time, eid, ipaddr
 * @param  {Function} callback [description]
 * args: err
 */
function insert(eid, ipaddr, callback) {
  connection.query('insert into HourLog values (current_date(), current_time(), ?, ?)', [eid, ipaddr], function(err) {
    err ? callback(err) : callback(null);
  });
}

function deleteLog(time,date, callback) {
  connection.query('DELETE FROM HourLog WHERE time=? AND date=?', [time,date], function(err) {
    err ? callback(err) : callback(null);
  });
}

exports.selectAll = selectAll;
exports.selectById = selectById;
exports.selectByDay = selectByDay;
exports.insert = insert;
exports.deleteLog = deleteLog;
