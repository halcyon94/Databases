//routes for serving JSON
'use strict';
(require('rootpath')());

module.exports = function(app) {
  //endpoints:
  //==========
  var employeesCtrl = require('controllers/employees');
  app.get('/employees', employeesCtrl.getAll);
  app.post('/employees', employeesCtrl.post);
  app.get('/employees/:eid', employeesCtrl.getById);
  app.put('/employees/:eid', employeesCtrl.put);
  app.delete('/employees/:eid', function(req,res,next) {console.log(10); next();},employeesCtrl.deleteById);

  var homeCtrl = require('controllers/home');
  app.get('/home', homeCtrl.get);

  var calCtrl = require('controllers/calendar');
  app.get('/calendar',calCtrl.getAllHours);
  app.post('/calendar', calCtrl.insertHour);
  app.delete('/calendar/:eid/:time/:date', calCtrl.deleteHour);
  app.put('/calendar/:eid/:time/:date', calCtrl.updateHour);
  // var auth = require('controllers/auth');
  // app.get('/auth/user', auth.checkLoggedIn, auth.getUserInfo);
  // app.post('/auth/user', auth.signup);
  // app.delete('/auth/session', auth.checkLoggedIn, auth.logout);
  // app.post('/auth/session', auth.login);
  // app.get('/logout', auth.logout);
  
}