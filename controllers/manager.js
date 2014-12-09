'use strict';
(require('rootpath')());

var async = require('async');
var PayEarned = require('models/PayEarned');

function calculatePay(req, res, next) {

  PayEarned.getPay(payperiod1, payperiod2, function(err, result) {
    if (err) { return next(err); }
    res.json(result);
  });
}




exports.getPay = getPay;
