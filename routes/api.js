//routes for serving JSON
'use strict';
(require('rootpath')());

module.exports = function(app) {
  //endpoints:
  //==========
  var employeesCtrl = require('controllers/employees');
  app.get('/employees', employeesCtrl.getAll);
  app.get('/employees/:id', employeesCtrl.getById);
  app.post('/employees', employeesCtrl.post);
  app.put('/employees/:id', employeesCtrl.put);
  app.delete('/employees/:id', employeesCtrl.deleteById);

  var homeCtrl = require('controllers/home');
  app.get('/home', homeCtrl.get);
  // var auth = require('controllers/auth');
  // app.get('/auth/user', auth.checkLoggedIn, auth.getUserInfo);
  // app.post('/auth/user', auth.signup);
  // app.delete('/auth/session', auth.checkLoggedIn, auth.logout);
  // app.post('/auth/session', auth.login);
  // app.get('/logout', auth.logout);
  
}