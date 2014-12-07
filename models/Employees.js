'use strict';
var connection = require('config/db');

/**
 * [selectAll description]
 * @param  {Function} callback [description]
 * args: err, array of employees
 */
function selectAll(callback) {
  connection.query('SELECT * from Employees', callback);
}

/**
 * [selectById description]
 * @param  {[type]}   eid       [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function selectById(eid, callback) {
  connection.query('SELECT * FROM Employees WHERE eid = ?', [eid], function(err, result) {
    if (err) {return callback(err); }
    if (!result[0]) { return callback(new Error('No existing user')); }
    callback(null, result[0]);
  });
}

/**
 * [insert description]
 * @param  {object}   employee
 * employee object contains fields:
 * eid, lastname, firstname, email, date, phone
 * @param  {Function} callback [description]
 * args: err
 */
function insert(employee, callback) {
  connection.query('INSERT INTO Employees SET ?;', employee, function(err, result) {
    err ? callback(err) : callback(null, result.insertId);
  });
}

function deleteById(eid, callback) {
  connection.query('DELETE FROM Employees WHERE eid=?', [eid], function(err) {
    err ? callback(err) : callback(null);
  });
}

/**
 * [update description]
 * @param  {object}   employee
 * employee object contains fields:
 * id, lastname, firstname, email, date, phone
 * @param  {Function} callback
 * args: err
 */
function update(employee, callback) {
  console.log(employee);
  connection.query('UPDATE Employees SET lastname = ?, firstname = ?, email = ?, dob = ?, phone = ? WHERE eid = ?', employee, function(err) {
    err ? callback(err) : callback(null);
  });
}

exports.selectAll = selectAll;
exports.selectById = selectById;
exports.insert = insert;
exports.deleteById = deleteById;
exports.update = update;
