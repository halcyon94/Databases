'use strict';
(require('rootpath')());

var configs = require('config/configs');
var passport = configs.passport;

exports.checkLoggedIn = function(req, res, next) {
  req.user ? next() : res.sendStatus(401); //401 - unauthorized
}

//operator, superviser, sudoer 
exports.checkOperator = function(req, res, next) {
  exports.checkLoggedIn(req, res, next);
}

exports.checkSuperviser = function(req, res, next) {
  if (req.user.title === 'superviser' || req.user.title === 'sudoer') {
    return next();
  }
  res.sendStatus(401);
}

exports.checkSudoer = function(req, res, next) {
  if (req.user.title === 'sudoer') {
    return next();
  }
  res.sendStatus(401);
}

exports.logout = function(req, res) {
  req.logout();
  res.sendStatus(200);
}

exports.login = function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    var error = err || info;
    if (error) { return next(error); }
    req.login(user, function(err) {
      if (err) { return next(err); }
      res.sendStatus(200);
    });
  })(req, res, next);
}

exports.getUserInfo = function(req, res) {
  res.send({
    email: req.user.email
  });
}