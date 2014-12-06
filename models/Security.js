'use strict';
var connection = require('config/db');

/**
 * [selectAll description]
 * @param  {Function} callback [description]
 * args: err, array of employees
 */
function selectAll(callback) {
  connection.query('SELECT * from Security', callback);
}

function selectById(eid, callback) {
  connection.query('SELECT * FROM Security WHERE eid = ?', [eid], function(err, result) {
    if (err) {return callback(err); }
    if (!result[0]) { return callback(new Error('No existing user')); }
    callback(null, result[0]);
  });
}

/**
 * [insert description]
 * @param  {object}   security
 * security object contains fields:
 * login, password (SHA1 hash), eid
 * @param  {Function} callback [description]
 * args: err
 */
function insert(login, password, eid, row_created_user, callback) {
  connection.query('insert into Security (login, password, eid, row_created_user) values (?, sha1(?), ?, ?)', [login, password, eid, row_created_user], function(err) {
    err ? callback(err) : callback(null);
  });
}

function deleteSecurity(eid, callback) {
  connection.query('DELETE FROM Security WHERE eid=?', [eid], function(err) {
    err ? callback(err) : callback(null);
  });
}

function update(password, eid, callback) {
  connection.query('UPDATE Security SET password = sha1(?) where eid=?', [password, eid], function(err) {
    err ? callback(err) : callback(null);
  });
}

exports.selectAll = selectAll;
exports.selectById = selectById;
exports.insert = insert;
exports.deleteSecurity = deleteSecurity;
exports.update = update;
