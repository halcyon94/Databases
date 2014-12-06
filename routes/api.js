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

  
  // var auth = require('controllers/auth');
  // app.get('/auth/user', auth.checkLoggedIn, auth.getUserInfo);
  // app.post('/auth/user', auth.signup);
  // app.delete('/auth/session', auth.checkLoggedIn, auth.logout);
  // app.post('/auth/session', auth.login);
  // app.get('/logout', auth.logout);
  
}