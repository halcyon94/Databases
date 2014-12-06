var express = require('express');
var mysql   = require('mysql');
var app = express();
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'recognitio',
  database : 'testing'
});
//--------------------
//app.use(express.bodyParser()); //use if file-upload needed. else below 2 are enough. //POST works with form-data
app.use(express.json());
app.use(express.urlencoded());	//POST works with url query-string
//--------------------
//path.join(__dirname,'public')
//GET /static/javascripts/jquery.js
app.use('/static', express.static('public'));
//--------------------
app.get('/employees.html', function(req, res) {
   res.sendfile('./public/DataGrid.html');
});
//--------------------
app.get('/employees', function(req, res) {
	//connection.connect();   // --> optional
	connection.query('SELECT * from Employee', function(err, results) {
	  if (err) {
		res.statusCode = 500;
		console.log(err);
		return res.send('Error Code 500: Database server connection problem.');
	  }
	res.json(results);
	});
	//connection.end();
});
//--------------------
app.get('/employees/:id', function(req, res) {
	connection.query('SELECT * FROM Employee WHERE id = ?', [parseInt(req.params.id,10)], function(err, result) {
	  if (err) {
		res.statusCode = 500;
		console.log(err);
		res.send('Error Code 500: Database server connection problem.');
	  }
	  else{
	  	if(result.length === 0)
	  	{
	  		res.statusCode = 404;
	  		res.send('Error Code 404: Record not found.');
	  	}
	  	else res.json(result);
	  }
	});
});
//--------------------
app.post('/employees', function(req, res) {		//insert
	if(!req.body.hasOwnProperty('id') ||
		!req.body.hasOwnProperty('lastname')) {
		res.statusCode = 400;
		console.log("post body: " + req.body);
		//console.log("post urlParams: " + req.params);
		return res.send('Error Code 400: Post syntax incorrect.');
	}
  //check for unique id
  connection.query('SELECT COUNT(*) as yes FROM Employee WHERE ID = ?', [parseInt(req.body.id,10)], function(err, result) {
  	if (err || result[0].yes === 1) {
  		res.statusCode = 500;
  		console.log('Duplicate employee record insertion detected, operation stopped!');
  		return res.send('Error Code 500: Employee ID should be Unique.');
  	}
  	else{
  		var employee = {
  			ID 				: parseInt(req.body.id,10),
  			LastName 		: req.body.lastname,
  			FirstName 		: req.body.firstname,
  			Email 			: req.body.email,
			DOB			 	: req.body.date, 	//new Date()
			Phone	 		: req.body.phone,
		};
		connection.query('INSERT INTO Employee SET ?', employee, function(err, result) {
			if (err) {
				res.statusCode = 500;
				console.log(err);
				return res.send('Error Code 500: Database server connection problem.');
			}
			res.json(true);
		});
	}
 });
});
//--------------------
app.put('/employees/:id', function(req, res) {		//edit
	if(req.params.id == null ||
		 !req.body.hasOwnProperty('lastname')) {
		res.statusCode = 400;
		console.log("post body: " + req.body);
		return res.send('Error Code 400: Post syntax incorrect.');
	}
	var employee = [
		req.body.lastname,
		req.body.firstname,
		req.body.email,
		req.body.date,
		req.body.phone,
		parseInt(req.params.id,10)
	];
	connection.query('UPDATE Employee SET LastName = ?, FirstName = ?, Email = ?, DOB = ?, Phone = ? WHERE ID = ?', employee, function(err, result) {
	  if (err) {
		res.statusCode = 500;
		console.log(err);
		res.send('Error Code 500: Database server connection problem.');
	  }
	  else{
	  	if(result.affectedRows === 0)
	  	{
	  		res.statusCode = 404;
	  		res.send('Error Code 404: Record not found.');
	  	}
	  	else res.json(true);
	  }
	});
});
//--------------------
app.delete('/employees/:id', function(req, res) {
  if(req.params.id == null) {
    res.statusCode = 404;
    return res.send('Error Code 404: No Record found. ID param should not be empty.');
  }
	connection.query('DELETE FROM Employee WHERE ID=?', [parseInt(req.params.id,10)], function(err, result) {
	  if (err) {
		res.statusCode = 500;
		console.log(err);
		res.send('Error Code 500: Database server connection problem.');
	  }
	  else{
	  	if(result.affectedRows === 0)
	  	{
	  		res.statusCode = 404;
	  		res.send('Error Code 404: Record not found.');
	  	}
	  	else res.json(true);
	  }
	});
});
//--------------------
app.listen(8800);
console.log("Application running! listening on port 8800 ...");
//--------------------//