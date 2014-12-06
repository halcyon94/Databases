'use strict';
var connection = require('config/db');

/**
 * [selectAll description]
 * @param  {Function} callback [description]
 * args: err, array of employees
 */
function selectAll(callback) {
  connection.query('SELECT * from WorksAs', callback);
}

/**
 * [selectById description]
 * @param  {[type]}   eid       [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function selectById(eid, callback) {
  connection.query('SELECT * FROM WorksAs WHERE eid = ?', [eid], function(err, result) {
    if (err) {return callback(err); }
    if (!result[0]) { return callback(new Error('No existing user')); }
    callback(null, result[0]);
  });
}

/**
 * [insert description]
 * @param  {object}   WorkAs
 * WorkAs object contains fields:
 * id, employee id, position id, start date, end date
 * @param  {Function} callback [description]
 * args: err
 */
function promote(eid, pid, callback) {
  connection.query('update WorksAs set end = current_date() where id = (select id from WorksAs where eid = ? AND end = NULL) ; INSERT INTO WorksAs (eid, pid, start) values (?, ?, current_date() )', [eid, eid, pid], function(err) {
    err ? callback(err) : callback(null);
  });
}


exports.selectAll = selectAll;
exports.selectById = selectById;
exports.promote = promote;
