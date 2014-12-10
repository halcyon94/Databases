//routes for serving JSON
'use strict';
(require('rootpath')());

module.exports = function(app) {
  //endpoints:
  //==========
  
  var auth = require('controllers/auth');
  app.post('/user', auth.login);
  app.get('/logout', auth.logout);

  var employeesCtrl = require('controllers/employees');
  // app.get('/employees', auth.checkOperator, employeesCtrl.getAll);
  // app.post('/employees', auth.checkSudoer, employeesCtrl.post);
  // app.get('/employees/:eid', auth.checkOperator, employeesCtrl.getById);
  // app.put('/employees/:eid', auth.checkSudoer, employeesCtrl.put);
  // app.delete('/employees/:eid', auth.checkSudoer, employeesCtrl.deleteById);

  //use hello17 as username and hello as pass
  
  app.get('/employees', employeesCtrl.getAll);
  app.post('/employees', employeesCtrl.post);
  app.get('/employees/:eid', employeesCtrl.getById);
  app.put('/employees/:eid', employeesCtrl.put);
  app.delete('/employees/:eid', employeesCtrl.deleteById);

  var homeCtrl = require('controllers/home');
  app.get('/home', auth.checkOperator, homeCtrl.get);
  app.get('/homehours',homeCtrl.show);
  app.post('/home',auth.checkOperator,homeCtrl.submitWorkHour);

  var calCtrl = require('controllers/calendar');
  app.get('/calendar',calCtrl.getAllHours);
  app.post('/calendar', calCtrl.insertHour);
  app.delete('/calendar', calCtrl.deleteHour);
  app.put('/calendar/:eid/:time/:day', calCtrl.updateHour);



  // var auth = require('controllers/auth');
  // app.get('/auth/user', auth.checkLoggedIn, auth.getUserInfo);
  // app.post('/auth/user', auth.signup);
  // app.delete('/auth/session', auth.checkLoggedIn, auth.logout);
  // app.post('/auth/session', auth.login);
  // app.get('/logout', auth.logout);
  
}