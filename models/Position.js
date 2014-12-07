'use strict';
var connection = require('config/db');

/**
 * [selectAll description]
 * @param  {Function} callback [description]
 * args: err, array of positions
 */
function selectAll(callback) {
  connection.query('SELECT * from Position', callback);
}

/**
 * [insert description]
 * @param  {object}   Position
 * position object contains fields:
 * id, title, rate, rcu, rct
 * @param  {Function} callback [description]
 * args: err
 */
function insert(title, rate, row_created_user, callback) {
  connection.query('insert into Position (title, rate, row_created_user) values (?, ?, ?)', [title, rate, row_created_user], function(err) {
    err ? callback(err) : callback(null);
  });
}

function selectById(pid, callback) {
  connection.query('SELECT * FROM Position WHERE pid = ?', [pid], function(err, result) {
   if (err) {return callback(err); }
    if (!result[0]) { return callback(new Error('No existing user')); }
    callback(null, result[0]);
   });
}

function getLowestLevelPid(callback) {
  connection.query('select pid, min(rate) as rate from Position; ', [], function(err, result) {
    err || !result[0] ? callback(err) : callback(null, result[0].pid);
  });
}

function deleteByTitle(title, callback) {
  connection.query('DELETE FROM Position WHERE title=?', [title], function(err) {
    err ? callback(err) : callback(null);
  });
}

function deleteByPid(pid, callback) {
  connection.query('DELETE FROM Position WHERE pid=?', [pid], function(err) {
    err ? callback(err) : callback(null);
  });
}

/**
 * [update description]
 * @param  {object}   employee
 * position object contains fields:
 * id, title, rate, rcu, rct
 * @param  {Function} callback
 * args: err
 */
function update(title, rate, pid, callback) {
  connection.query('UPDATE Position SET title = ?, rate = ? WHERE pid = ?', [title, rate, pid], function(err) {
    err ? callback(err) : callback(null);
  });
}

exports.selectAll = selectAll;
exports.insert = insert;
exports.deleteByTitle = deleteByTitle;
exports.deleteByPid = deleteByPid;
exports.update = update;
exports.getLowestLevelPid = getLowestLevelPid;
exports.selectById = selectById;