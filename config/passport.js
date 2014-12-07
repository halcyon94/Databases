'use strict';
require('rootpath')();

var async = require('async');
var LocalStrategy = require('passport-local').Strategy;
var Security = require('models/Security');
var Position = require('models/Position');
var WorksAs = require('models/WorksAs');
var Employees = require('models/Employees');
var dbErrors = require('config/settings/dbErrors');

function localLoginVerifyCallback(login, password, done) {
  async.waterfall(
  [
    function(callback) {
      Security.selectByLogin(login, password, function(err, result) {
        if (err || !result) { return callback(err); }
        callback(null, result.eid);
      });
    },
    function(eid, callback) {
      Employees.selectById(eid, function(err, result) {
        if (err) { return callback(err); }
        callback(null, result);
      });
    },
    function(user, callback) {
      WorksAs.selectById(user.eid, function(err, result) {
        if (err) { return callback(err); }
        callback(null, user, result.pid);
      });
    },
    function(user, pid, callback) {
      Position.selectById(pid, function(err, pos) {
        if (err) { return callback(err); }
        user.title = pos.title;
        callback(null, user);
      });
    }
  ],
  function(err, result) {
    if (err) { return done(null, false, new Error('incorrect login info.'));  }
    done(null, result);
  });
}

module.exports = function(passport) {

  // Serialize the user for the session
  // only store the id
  passport.serializeUser(function(employee, done) { done(null, employee.eid);});

  // Deserialize the user
  passport.deserializeUser(function(eid, done) {
    async.waterfall(
    [
      function(eid, callback) {
        Employees.selectById(eid, function(err, result) {
          if (err) { return callback(err); }
          callback(null, result);
        });
      },
      function(user, callback) {
        WorksAs.selectById(user.eid, function(err, result) {
          if (err) { return callback(err); }
          callback(null, user, result.pid);
        });
      },
      function(user, pid, callback) {
        Position.selectById(pid, function(err, pos) {
          if (err) { return callback(err); }
          user.title = pos.title;
          callback(null, user);
        });
      }
    ],
    function(err, user) {
      done(err, user);
    });
  });

  // Local login strategy
  passport.use('local-login', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
  },
  localLoginVerifyCallback));

};