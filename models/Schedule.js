'use strict';
var connection = require('config/db');

/**
 * [selectAll description]
 * @param  {Function} callback [description]
 * args: err, array of schedule
 */
function selectAll(callback) {
  connection.query('SELECT * from Schedule', callback);
}

/**
 * [insert description]
 * @param  {object}   schedule
 * schedule object contains fields:
 * day, time, employee id
 * @param  {Function} callback [description]
 * args: err
 */

function insert(day, time, eid, row_created_user, callback){
  connection.query('insert into Schedule (day, time, eid, row_created_user) values (?, ?, ?, ?)', 
   [ day, time, eid, row_created_user ], function(err, result) { 
    err ? callback(err) : callback(null, result.insertId);
  });
}

function deleteSchedule(day,time, callback) {
  connection.query('DELETE FROM Schedule WHERE day=? AND time=?', [day, time], function(err) {
    err ? callback(err) : callback(null);
  });
}

exports.selectAll = selectAll;
exports.insert = insert;
exports.deleteSchedule = deleteSchedule;
